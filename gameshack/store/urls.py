from django.urls import path
from . import views

urlpatterns = [
    # Cart URLs
    path('cart/', views.CartListView.as_view(), name='cart-list'),
    path('cart/create/', views.CartCreateView.as_view(), name='cart-create'),

    # For cart detail and deletion
    path('cart/<int:game_id>/', views.CartDetailView.as_view(), name='cart-detail'),

    # Favorite URLs
    path('favorite/', views.FavoriteListView.as_view(), name='favorite-list'),
    path('favorite/create/', views.FavoriteCreateView.as_view(), name='favorite-create'),

    # For favorite detail and deletion
    path('favorite/<int:game_id>/', views.FavoriteDetailView.as_view(), name='favorite-detail'),
]
