# store/urls.py
from django.urls import path
from .views import GameListView, AddToCartView, PurchaseView

urlpatterns = [
    path('games/', GameListView.as_view(), name='game-list'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('purchase/', PurchaseView.as_view(), name='purchase'),
]
