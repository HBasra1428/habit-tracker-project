from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'people', views.PersonViewSet)
router.register(r'admins', views.AdminViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'habits', views.HabitViewSet)
router.register(r'habit-logs', views.HabitLogViewSet)
router.register(r'goals', views.GoalsViewSet)
router.register(r'reminders', views.ReminderViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'rewards-penalties', views.RewardsPenaltiesViewSet)
router.register(r'streaks', views.StreakViewSet)
router.register(r'achievements', views.AchievementViewSet)

urlpatterns = [
    path('', include(router.urls)),
]