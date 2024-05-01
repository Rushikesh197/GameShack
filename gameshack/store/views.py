from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Cart, Favorite
from .serializers import CartSerializer, FavoriteSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from .models import Cart

# Cart Views
class CartListView(generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

class CartCreateView(generics.CreateAPIView):
    queryset = Cart.objects.none()  # No queryset for creation-only view
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

class CartDetailView(generics.RetrieveDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_object(self):
        game_id = self.kwargs.get('game_id')
        return self.queryset.get(game_id=game_id)

# Favorite Views
class FavoriteListView(generics.ListAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [AllowAny]

class FavoriteCreateView(generics.CreateAPIView):
    queryset = Favorite.objects.none()  # No queryset for creation-only view
    serializer_class = FavoriteSerializer
    permission_classes = [AllowAny]

class FavoriteDetailView(generics.RetrieveDestroyAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

    def get_object(self):
        game_id = self.kwargs.get('game_id')
        return self.queryset.get(game_id=game_id)

def delete_cart_item(request, id):
    try:
        cart_item = get_object_or_404(Cart, id=id)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Cart.DoesNotExist:
        return Response({'error': f'Cart with id {id} does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)