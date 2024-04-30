from django.urls import path
from . import views

urlpatterns = [
    # URLs for NormalUser
    path('normal-user/', views.NormalUserListView.as_view(), name='normaluser-list'),
    path('normal-user/create/', views.NormalUserCreateView.as_view(), name='normaluser-create'),
    path('normal-user/<int:pk>/', views.NormalUserDetailView.as_view(), name='normaluser-detail'),

    # URLs for GameDeveloper
    path('game-developer/', views.GameDeveloperListView.as_view(), name='gamedeveloper-list'),
    path('game-developer/create/', views.GameDeveloperCreateView.as_view(), name='gamedeveloper-create'),
    path('game-developer/<int:pk>/', views.GameDeveloperDetailView.as_view(), name='gamedeveloper-detail'),
]
