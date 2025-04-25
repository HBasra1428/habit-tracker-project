from django.shortcuts import render, get_object_or_404
from rest_framework import generics, viewsets, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import ModelSerializer
from datetime import date, timedelta, datetime

# models for the app
from .models import (
    Person, Admin, User, Group, Habit, HabitLog, Goals,
    Reminder, Comment, RewardsPenalties, Streak, Achievement
)

# serializers for the app
from .serializers import (
    PersonSerializer, AdminSerializer, UserSerializer, GroupSerializer,
    HabitSerializer, HabitLogSerializer, GoalsSerializer, ReminderSerializer,
    CommentSerializer, RewardsPenaltiesSerializer, StreakSerializer, AchievementSerializer
)


# implementing the user viewset to handle CRUD operations for users
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    # allowing only users to view/edit their own profile unless they're admin
    def get_queryset(self):
        user = self.request.user
        queryset = Habit.objects.filter(user=user)  #Only return habits for the logged-in user

        # Optional: support filters via query params
        group_id = self.request.query_params.get('group_id')
        status_param = self.request.query_params.get('status')

        if group_id:
            queryset = queryset.filter(group__id=group_id)
        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset

    # action to retrieve person data related to the user, it will return the profile of that specific user
    @action(detail=True, methods=['get'])
    def person(self, request, pk=None):
        user = self.get_object()
        person = user.person
        serializer = PersonSerializer(person)
        return Response(serializer.data)

    # getting all the habits of the user 
    @action(detail=True, methods=['get'])
    def habits(self, request, pk=None):
        user = self.get_object()
        habits = Habit.objects.filter(user=user)
        serializer = HabitSerializer(habits, many=True)
        return Response(serializer.data)

    # groups that the user is in
    @action(detail=True, methods=['get'])
    def groups(self, request, pk=None):
        user = self.get_object()
        groups = user.person.groups.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='me/dashboard')
    def me_dashboard(self, request):
        return self.dashboard(request, pk=request.user.id)


    # dashboard stats endpoint, will be used in frontend when making the dashboard page
    @action(detail=True, methods=['get'])
    def dashboard(self, request, pk=None):
        user = request.user

        # getting the basic habit stats
        habits = Habit.objects.filter(user=user)
        active_habits = habits.filter(status='active').count()
        completed_habits = habits.filter(status='completed').count()

        # completion rate? if a goal is given, but what if no goal? *work required*
        completion_rate = self.completion_ratecal(habits)

        # getting streak info
        streak_data = self.streak_dataget(habits)

        # *added functionality* logging habit
        recent_logs = HabitLog.objects.filter(habit__user=user).order_by('-date')[:7]
        recent_log_data = self.r_logs(recent_logs)

        # getting goal info
        goals = Goals.objects.filter(user=user)
        in_progress_goals = goals.filter(status='in_progress').count()
        completed_goals = goals.filter(status='achieved').count()

        # rewards and penalties info
        rewards = RewardsPenalties.objects.filter(user=user, type='reward').count()
        penalties = RewardsPenalties.objects.filter(user=user, type='penalty').count()

        return Response({
            'active_habits': active_habits,
            'completed_habits': completed_habits,
            'completion_rate': completion_rate,
            'streak_data': streak_data,
            'recent_logs': recent_log_data,
            'in_progress_goals': in_progress_goals,
            'completed_goals': completed_goals,
            'rewards': rewards,
            'penalties': penalties,
        })

    def completion_ratecal(self, habits):
        """Calculates the completion rate for habits"""
        total_habits = habits.count()
        completed_habits = habits.filter(status='completed').count()
        if total_habits > 0:
            return (completed_habits / total_habits) * 100
        return 0

    def streak_dataget(self, habits):
        """Calculates streak data for the user"""
        streak_data = []
        for habit in habits:
            streak_data.append({
                'habit_name': habit.name,
                'current_streak': habit.get_current_streak(),
                'longest_streak': habit.get_longest_streak(),
            })
        return streak_data

    def r_logs(self, recent_logs):
        """Formats the most recent habit logs"""
        recent_log_data = []
        for log in recent_logs:
            recent_log_data.append({
                'habit_name': log.habit.name,
                'date': log.date,
                'notes': log.notes,
            })
        return recent_log_data


# CRUD for admin
class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def make_admin(self, request):
        # promoting a user to admin

        user_id = request.data.get('user_id')
        secure_key = request.data.get('secure_key')
        user = get_object_or_404(User, id=user_id)
        user.is_staff = True
        user.save()
        Admin.objects.create(user=user, secure_key=secure_key, admin_levels=1)
        return Response({'message': f'{user.username} is now an Admin'}, status=201)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def remove_admin(self, request):
        # demoting a user from admin

        user_id = request.data.get('user_id')
        user = get_object_or_404(User, id=user_id)
        # removing from Admin table if exists
        Admin.objects.filter(user=user).delete()
        user.is_staff = False
        user.save()
        return Response({'message': f'{user.username} is no longer an Admin'}, status=200)


# user registration
class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]  # allowing everyone to access


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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Habit.objects.filter(user=user)

        group_id = self.request.query_params.get('group_id')
        status_param = self.request.query_params.get('status')

        if group_id:
            queryset = queryset.filter(group__id=group_id)
        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset


    def list(self, request, *args, **kwargs):
        habits = self.get_queryset()
        for habit in habits:
            habit.check_and_reset_streak()
        return super().list(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def mark_done(self, request, pk=None):
        habit = self.get_object()
        today = date.today()

        # preventing marking the habit as done twice in a single day, check if it exists or not
        if HabitLog.objects.filter(habit=habit, date=today).exists():
            return Response({'message': 'Habit already marked as done today'}, status=status.HTTP_200_OK)

        notes = request.data.get('notes', '')
        HabitLog.objects.create(habit=habit, date=today, notes=notes)

        current_streak = habit.get_current_streak()
        longest_streak = habit.get_longest_streak()

        person = habit.user.profile
        if longest_streak > person.longest_streak:
            person.longest_streak = longest_streak
            person.save()

        habit.save()

        # Check for achievements based on streak milestones
        self.checker_streak_achievements(habit)

        return Response({
            'message': 'Habit marked as done!',
            'current_streak': habit.get_current_streak(),
            'longest_streak': habit.get_longest_streak()
        }, status=status.HTTP_200_OK)

    def checker_streak_achievements(self, habit):
        milestone_map = {  # have to think the names for these achievements and then update them later on 
            7: "Weekly achievement",
            30: "Monthly achievement",
            100: "100 days achievement",
            365: "one year achievement"
        }

        for days, name in milestone_map.items():
            if habit.get_current_streak() >= days:
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
            queryset = queryset.filter(habit=habit_id)
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)

        return queryset

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='today')
    def today_logs(self, request):
        today = date.today()
        logs = HabitLog.objects.filter(habit__user=request.user, date=today)
        return Response([log.habit.habit_id for log in logs])



class GoalsViewSet(viewsets.ModelViewSet):
    queryset = Goals.objects.all()
    serializer_class = GoalsSerializer


class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Reminder.objects.filter(habit__user=self.request.user)



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
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='me')
    def user_achievements(self, request):
        achievements = Achievement.objects.filter(user=request.user)
        serializer = self.get_serializer(achievements, many=True)
        return Response(serializer.data)
