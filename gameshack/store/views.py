# store/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer

class GameListView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class AddToCartView(generics.CreateAPIView):
    serializer_class = GameSerializer

    def post(self, request, *args, **kwargs):
        game_id = request.data.get('game_id')
        try:
            game = Game.objects.get(id=game_id)
            # Logic to add game to cart (not implemented)
            return Response({'message': f'Added {game.title} to cart'}, status=status.HTTP_201_CREATED)
        except Game.DoesNotExist:
            return Response({'message': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)

class PurchaseView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        # Logic to process purchase (not implemented)
        return Response({'message': 'Purchase successful'}, status=status.HTTP_200_OK)
