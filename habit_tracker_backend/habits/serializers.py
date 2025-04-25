from rest_framework import serializers
from .models import (
    Person, Admin, User, Group, Habit, Goals,
    Reminder, Comment, RewardsPenalties, Streak, Achievement, HabitLog
)

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['habit_id', 'name', 'description', 'status', 'start_date', 'end_date']  # include only what's needed
        read_only_fields = ['habit_id', 'start_date', 'end_date']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user  # ✅ assign current user
        return super().create(validated_data)


class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = '__all__'
        
class GoalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goals
        fields = '__all__'

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class RewardsPenaltiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RewardsPenalties
        fields = '__all__'

class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'
