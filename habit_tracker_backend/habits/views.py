from django.shortcuts import render
from rest_framework import generics
from .models import (
    Person, Admin, User, Group, Habit, Goals,
    Reminder, Comment, RewardsPenalties, Streak, Achievement
)
from .serializers import (
    PersonSerializer, AdminSerializer, UserSerializer, GroupSerializer,
    HabitSerializer, GoalsSerializer, ReminderSerializer, CommentSerializer,
    RewardsPenaltiesSerializer, StreakSerializer, AchievementSerializer
)


class PersonListCreateView(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class PersonDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class AdminListCreateView(generics.ListCreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class AdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupListCreateView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class GroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class HabitListCreateView(generics.ListCreateAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

class HabitDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

class GoalsListCreateView(generics.ListCreateAPIView):
    queryset = Goals.objects.all()
    serializer_class = GoalsSerializer

class GoalsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Goals.objects.all()
    serializer_class = GoalsSerializer

class ReminderListCreateView(generics.ListCreateAPIView):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer

class ReminderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class RewardsPenaltiesListCreateView(generics.ListCreateAPIView):
    queryset = RewardsPenalties.objects.all()
    serializer_class = RewardsPenaltiesSerializer

class RewardsPenaltiesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RewardsPenalties.objects.all()
    serializer_class = RewardsPenaltiesSerializer

class StreakListCreateView(generics.ListCreateAPIView):
    queryset = Streak.objects.all()
    serializer_class = StreakSerializer

class StreakDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Streak.objects.all()
    serializer_class = StreakSerializer

class AchievementListCreateView(generics.ListCreateAPIView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

class AchievementDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

