from django.contrib import admin
from .models import Person, Admin, User, Group, Habit, Goals, Reminder, Comment, RewardsPenalties, Streak, Achievement

admin.site.register(Person)
admin.site.register(Admin)
admin.site.register(User)
admin.site.register(Group)
admin.site.register(Habit)
admin.site.register(Goals)
admin.site.register(Reminder)
admin.site.register(Comment)
admin.site.register(RewardsPenalties)
admin.site.register(Streak)
admin.site.register(Achievement)

