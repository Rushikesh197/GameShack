from django.urls import path
from .views import GameListView, GameCreateView, GameDetailView

urlpatterns = [
    path('games/', GameListView.as_view(), name='game-list'),
    path('games/create/', GameCreateView.as_view(), name='game-create'),
    path('games/<int:pk>/', GameDetailView.as_view(), name='game-detail'),
]
