from django.urls import path
from . import views

urlpatterns = [
    path('games/', views.GameListView.as_view(), name='game-list'),
    path('games/create/', views.GameCreateView.as_view(), name='game-create'),
    path('games/<int:pk>/', views.GameDetailView.as_view(), name='game-detail'),
]
