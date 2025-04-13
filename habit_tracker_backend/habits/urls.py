from django.urls import path
from . import views

urlpatterns = [
    path('persons/', views.PersonListCreateView.as_view()),
    path('persons/<int:pk>/', views.PersonDetailView.as_view()),

    path('admins/', views.AdminListCreateView.as_view()),
    path('admins/<int:pk>/', views.AdminDetailView.as_view()),

    path('users/', views.UserListCreateView.as_view()),
    path('users/<int:pk>/', views.UserDetailView.as_view()),

    path('groups/', views.GroupListCreateView.as_view()),
    path('groups/<int:pk>/', views.GroupDetailView.as_view()),

    path('habits/', views.HabitListCreateView.as_view()),
    path('habits/<int:pk>/', views.HabitDetailView.as_view()),

    path('goals/', views.GoalsListCreateView.as_view()),
    path('goals/<int:pk>/', views.GoalsDetailView.as_view()),

    path('reminders/', views.ReminderListCreateView.as_view()),
    path('reminders/<int:pk>/', views.ReminderDetailView.as_view()),

    path('comments/', views.CommentListCreateView.as_view()),
    path('comments/<int:pk>/', views.CommentDetailView.as_view()),

    path('rewardspenalties/', views.RewardsPenaltiesListCreateView.as_view()),
    path('rewardspenalties/<int:pk>/', views.RewardsPenaltiesDetailView.as_view()),

    path('streaks/', views.StreakListCreateView.as_view()),
    path('streaks/<int:pk>/', views.StreakDetailView.as_view()),

    path('achievements/', views.AchievementListCreateView.as_view()),
    path('achievements/<int:pk>/', views.AchievementDetailView.as_view()),
]
