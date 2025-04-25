from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import timedelta
from django.utils import timezone

class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    longest_streak = models.IntegerField(default=0)
    groups = models.ManyToManyField('Group', related_name='members', blank=True)
    
    def __str__(self):
        return f"Profile for {self.user.username}"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Person.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    secure_key = models.CharField(max_length=255)
    admin_levels = models.IntegerField(default=1)

    def __str__(self):
        return f"Admin: {self.user.username}"

class Group(models.Model):
    group_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default="New Group")
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Habit(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
    ]
    

    habit_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)
    
    # changed to link to Django User instead of Person
    user = models.ForeignKey(User, related_name='habits', on_delete=models.CASCADE)    
    target_days_per_week = models.PositiveIntegerField(null=True, blank=True)

    def get_current_streak(self):
        logs = self.logs.order_by('-date')
        today = timezone.now().date()
        streak = 0

        for i, log in enumerate(logs):
            expected_date = today - timedelta(days=i)
            if log.date == expected_date:
                streak += 1
            else:
                break
        return streak
    
    def get_longest_streak(self):
        logs = self.logs.order_by('date')
        longest = 0
        current = 0
        previous_date = None

        for log in logs:
            if previous_date and (log.date - previous_date).days == 1:
                current += 1
            else:
                current = 1
            longest = max(longest, current)
            previous_date = log.date
        return longest

    def check_and_reset_streak(self):
        today = timezone.now().date()
        yesterday = today - timedelta(days=1)
        weekday = today.strftime('%a')

    # only resetting it if the habit is supposed to be active today
        #if self.repeat_days and weekday not in self.repeat_days:
            #return  # if the habit is not scheduled today, do nothing

        logged_today = self.logs.filter(date=today).exists()
        logged_yesterday = self.logs.filter(date=yesterday).exists()

        if not logged_today and not logged_yesterday:
            if self.get_current_streak() > 0:
                self.current_streak = 0
                self.save()
            
    def __str__(self):
        return self.name

class HabitLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    habit = models.ForeignKey(Habit, related_name='logs', on_delete=models.CASCADE)
    date = models.DateField()
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ('habit', 'date')

    def __str__(self):
        return f"{self.habit.name} on {self.date}"

class Goals(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('achieved', 'Achieved'),
        ('abandoned', 'Abandoned'),
    ]
    
    goal_id = models.AutoField(primary_key=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    description = models.TextField(blank=True)
    user = models.ForeignKey(User, related_name='goals', on_delete=models.CASCADE)
    habit = models.ForeignKey(Habit, related_name='goals', on_delete=models.CASCADE, null=True, blank=True)
    target = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.description

class Reminder(models.Model):
    FREQUENCY_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('custom', 'Custom'),
    ]
    
    reminder_id = models.AutoField(primary_key=True)
    time = models.TimeField()
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES, default='daily')
    description = models.TextField(blank=True)
    habit = models.ForeignKey(Habit, related_name='reminders', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.habit.name} reminder at {self.time}"

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    habit = models.ForeignKey(Habit, related_name='comments', on_delete=models.CASCADE)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.habit.name}"

class RewardsPenalties(models.Model):
    TYPE_CHOICES = [
        ('reward', 'Reward'),
        ('penalty', 'Penalty'),
    ]
    
    reward_penalty_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField()
    user = models.ForeignKey(User, related_name='rewards_penalties', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.type} for {self.user.username}"

class Streak(models.Model):
    streak_id = models.AutoField(primary_key=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(User, related_name='streaks', on_delete=models.CASCADE)
    group = models.ForeignKey(Group, related_name='streaks', on_delete=models.CASCADE, null=True, blank=True)
    length = models.PositiveIntegerField(default=0)

    def __str__(self):
        base = f"Streak of {self.length} days"
        return f"{base} for {self.user.username}"

class Achievement(models.Model):
    achievement_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    locked_status = models.BooleanField(default=True)
    description = models.TextField()
    user = models.ForeignKey(User, related_name='achievements', on_delete=models.CASCADE)
    streaks = models.ManyToManyField(Streak, related_name='achievements', blank=True)

 
    def __str__(self):
        status = "Locked" if self.locked_status else "Unlocked"
        return f"{self.name} ({status}) - {self.user.username}"