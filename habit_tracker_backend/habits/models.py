from django.db import models
from django.contrib.postgres.fields import ArrayField

class Person(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    passhash = models.CharField(max_length=255) 
    group = models.ForeignKey('Group', on_delete=models.SET_NULL, null=True, blank=True)
    longest_streak = models.IntegerField(default=0)
    groups = models.ManyToManyField('Group', related_name='members', blank=True)

    def __str__(self):
        return self.name

class Admin(models.Model):
    user = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True)
    secure_key = models.CharField(max_length=255)
    admin_levels = models.IntegerField(default=1)

    def __str__(self):
        return f"Admin: {self.user.name}"


class User(models.Model):
    user = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True)
    age = models.IntegerField(null=True, blank=True)
    join_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"User: {self.user.name}"

class Group(models.Model):
    group_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default="New Group")  # Added name field
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Habit(models.Model):
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
    ]
    
    DAYS_OF_WEEK = [
        ('Mon', 'Monday'),
        ('Tue', 'Tuesday'),
        ('Wed', 'Wednesday'),
        ('Thu', 'Thursday'),
        ('Fri', 'Friday'),
        ('Sat', 'Saturday'),
        ('Sun', 'Sunday'),
    ]

    habit_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)
    user = models.ForeignKey(Person, related_name='habits', on_delete=models.CASCADE)
    group = models.ForeignKey(Group, related_name='habits', on_delete=models.SET_NULL, null=True, blank=True)  
   
    repeat_days = ArrayField(
        models.CharField(max_length=3, choices=DAYS_OF_WEEK),
        blank=True,
        default=list
    )
    
    target_days_per_week = models.PositiveIntegerField(null=True, blank=True)
    current_streak = models.PositiveIntegerField(default=0)
    longest_streak = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

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
        ('deletion', 'Deleted'),
    ]
    
    goal_id = models.AutoField(primary_key=True)
    target = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    description = models.TextField(blank=True)
    user = models.ForeignKey(Person, related_name='goals', on_delete=models.CASCADE)
    habit = models.ForeignKey(Habit, related_name='goals', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    target_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.target


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
    user = models.ForeignKey(Person, related_name='comments', on_delete=models.CASCADE)
    habit = models.ForeignKey(Habit, related_name='comments', on_delete=models.CASCADE)

    def __str__(self):
        return f"Comment by {self.user.name} on {self.habit.name}"

class RewardsPenalties(models.Model):
    TYPE_CHOICES = [
        ('reward', 'Reward'),
        ('penalty', 'Penalty'),
    ]
    
    reward_penalty_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField()
    user = models.ForeignKey(Person, related_name='rewards_penalties', on_delete=models.CASCADE)
    date_assigned = models.DateTimeField(auto_now_add=True)
    is_redeemed = models.BooleanField(default=False)  # For rewards

    def __str__(self):
        return f"{self.type} for {self.user.name}"

class Streak(models.Model):
    streak_id = models.AutoField(primary_key=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(Person, related_name='streaks', on_delete=models.CASCADE)
    habit = models.ForeignKey(Habit, related_name='streaks', on_delete=models.CASCADE, null=True, blank=True)
    group = models.ForeignKey(Group, related_name='streaks', on_delete=models.CASCADE, null=True, blank=True)
    length = models.PositiveIntegerField(default=0)  # Track the length in days

    def __str__(self):
        base = f"Streak of {self.length} days"
        if self.habit:
            return f"{base} for {self.habit.name}"
        elif self.group:
            return f"{base} for {self.group.name}"
        return f"{base} for {self.user.name}"
    
class Achievement(models.Model):
    achievement_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    locked_status = models.BooleanField(default=True)
    description = models.TextField()
    user = models.ForeignKey(Person, related_name='achievements', on_delete=models.CASCADE)
    streak = models.ForeignKey(Streak, related_name='achievements', on_delete=models.SET_NULL, null=True, blank=True)
    date_unlocked = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        status = "Locked" if self.locked_status else "Unlocked"
        return f"{self.name} ({status}) - {self.user.name}"
