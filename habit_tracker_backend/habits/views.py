from django.shortcuts import render, get_object_or_404
from rest_framework import generics, viewsets, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from datetime import date, timedelta, datetime

from .models import (
    Person, Admin, User, Group, Habit, HabitLog, Goals,
    Reminder, Comment, RewardsPenalties, Streak, Achievement
)
from .serializers import (
    PersonSerializer, AdminSerializer, UserSerializer, GroupSerializer,
    HabitSerializer, HabitLogSerializer, GoalsSerializer, ReminderSerializer, 
    CommentSerializer, RewardsPenaltiesSerializer, StreakSerializer, AchievementSerializer
)

# ViewSet implementation for consistent API
class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email']
    
    @action(detail=True, methods=['get'])
    def habits(self, request, pk=None):
        person = self.get_object()
        habits = Habit.objects.filter(user=person)
        serializer = HabitSerializer(habits, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def groups(self, request, pk=None):
        person = self.get_object()
        groups = person.groups.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    
    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        group = self.get_object()
        members = group.members.all()
        serializer = PersonSerializer(members, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        group = self.get_object()
        try:
            person_id = request.data.get('person_id')
            person = Person.objects.get(user_id=person_id)
            group.members.add(person)
            return Response({'status': 'member added'}, status=status.HTTP_200_OK)
        except Person.DoesNotExist:
            return Response({'error': 'Person not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
    
    def get_queryset(self):
        queryset = Habit.objects.all()
        user_id = self.request.query_params.get('user_id')
        group_id = self.request.query_params.get('group_id')
        status_param = self.request.query_params.get('status')
        
        if user_id:
            queryset = queryset.filter(user__user_id=user_id)
        if group_id:
            queryset = queryset.filter(group__group_id=group_id)
        if status_param:
            queryset = queryset.filter(status=status_param)
            
        return queryset
    
    @action(detail=True, methods=['post'])
    def mark_done(self, request, pk=None):
        habit = self.get_object()
        today = date.today()

        if HabitLog.objects.filter(habit=habit, date=today).exists():
            return Response({'message': 'Habit already marked as done today'}, status=status.HTTP_200_OK)
        
        notes = request.data.get('notes', '')
        HabitLog.objects.create(habit=habit, date=today, notes=notes)
        
        yesterday = today - timedelta(days=1)
        if HabitLog.objects.filter(habit=habit, date=yesterday).exists():
            habit.current_streak += 1
        else:
            habit.current_streak = 1  # restart streak
        
        # update longest streak if needed
        if habit.current_streak > habit.longest_streak:
            habit.longest_streak = habit.current_streak
            
            # updating users strek as well
        person = habit.user
        if habit.longest_streak > person.longest_streak:
            person.longest_streak = habit.longest_streak
            person.save()
            
        habit.save()
        
        # Check for achievements based on streak milestones
        self._check_streak_achievements(habit)
        
        return Response({
            'message': 'Habit marked as done!', 
            'current_streak': habit.current_streak, 
            'longest_streak': habit.longest_streak
        }, status=status.HTTP_200_OK)
        
    def _check_streak_achievements(self, habit):
        milestone_map = {  # have to think the names for these achievements and then update them later on 
            7: "Weekly achievement",
            30: "Monthly achievement",
            100: "100 days achievement",
            365: "one year achievement"
        }
        
        for days, name in milestone_map.items():
            if habit.current_streak >= days:
                # checks if this achievement already exists
                achievement_exists = Achievement.objects.filter(
                    user=habit.user,
                    name=name,
                    locked_status=False
                ).exists()
                
                if not achievement_exists:
                    # creating a record for the streaks
                    streak = Streak.objects.create(
                        start_time=datetime.now() - timedelta(days=habit.current_streak),
                        user=habit.user,
                        habit=habit,
                        length=habit.current_streak
                    )
                    
                    # creating the achievement (if custom)
                    Achievement.objects.create(
                        name=name,
                        description=f"Maintained a streak of {days} days for {habit.name}",
                        user=habit.user,
                        locked_status=False,
                        streak=streak,
                        date_unlocked=datetime.now()
                    )

class HabitLogViewSet(viewsets.ModelViewSet):
    queryset = HabitLog.objects.all()
    serializer_class = HabitLogSerializer
    
    def get_queryset(self):
        queryset = HabitLog.objects.all()
        habit_id = self.request.query_params.get('habit_id')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        
        if habit_id:
            queryset = queryset.filter(habit__habit_id=habit_id)
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
            
        return queryset

class GoalsViewSet(viewsets.ModelViewSet):
    queryset = Goals.objects.all()
    serializer_class = GoalsSerializer

class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class RewardsPenaltiesViewSet(viewsets.ModelViewSet):
    queryset = RewardsPenalties.objects.all()
    serializer_class = RewardsPenaltiesSerializer

class StreakViewSet(viewsets.ModelViewSet):
    queryset = Streak.objects.all()
    serializer_class = StreakSerializer

class AchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer