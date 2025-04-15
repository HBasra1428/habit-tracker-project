from django.db import models
from django.contrib.postgres.fields import ArrayField

class Person(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    passhash = models.CharField(max_length=255)  # You might want to use Django's auth system later
    group = models.ForeignKey('Group', on_delete=models.SET_NULL, null=True, blank=True)
    longest_streak = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Admin(models.Model):
    user = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True)
    secure_key = models.CharField(max_length=255)
    admin_levels = models.IntegerField(default=1)


class User(models.Model):
    user = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True)
    age = models.IntegerField(null=True)
    join_date = models.DateField(auto_now_add=True)

class Group(models.Model):
    group_id = models.AutoField(primary_key=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Group {self.group_id}"

class Habit(models.Model):
    DAYS_OF_WEEK = [
        ('Mon', 'Monday'),
        ('Tue', 'Tuesday'),
        ('Wed', 'Wednesday'),
        ('Thu', 'Thursday'),
        ('Fri', 'Friday'),
        ('Sat', 'Saturday'),
        ('Sun', 'Sunday'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    repeat_days = ArrayField(
        models.CharField(max_length=3, choices=DAYS_OF_WEEK),
        blank=True,
        default=list
    )  # Specific days to complete 

    target_days_per_week = models.PositiveIntegerField(
        null=True,
        blank=True
    )  # Flexible goal 
    current_streak = models.PositiveIntegerField(default=0)
    longest_streak = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class HabitLog(models.Model):
    habit = models.ForeignKey(Habit, related_name='logs', on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"{self.habit.name} on {self.date}"


class Goals(models.Model):
    goal_id = models.AutoField(primary_key=True)
    target = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    description = models.TextField()
    user = models.ForeignKey(Person, on_delete=models.CASCADE)

class Reminder(models.Model):
    reminder_id = models.AutoField(primary_key=True)
    time = models.TimeField()
    frequency = models.CharField(max_length=50)
    description = models.TextField()
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Person, on_delete=models.CASCADE)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)

class RewardsPenalties(models.Model):
    reward_penalty_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=50)  # Reward or Penalty
    description = models.TextField()
    user = models.ForeignKey(Person, on_delete=models.CASCADE)

class Streak(models.Model):
    streak_id = models.AutoField(primary_key=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True, blank=True)

class Achievement(models.Model):
    achievement_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    locked_status = models.BooleanField(default=True)
    description = models.TextField()
    user = models.ForeignKey(Person, on_delete=models.CASCADE)
