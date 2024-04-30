from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from .models import Game
from rest_framework.filters import SearchFilter
from .serializers import GameSerializer

class GameListView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title', 'developer__name', 'release_date', 'price', 'description']

    def get_queryset(self):
        queryset = super().get_queryset()
        query_params = self.request.query_params

        if 'title' in query_params:
            queryset = queryset.filter(title__icontains=query_params['title'])
    
        if 'developer' in query_params:
            queryset = queryset.filter(developer__name__icontains=query_params['developer'])

        if 'release_date' in query_params:
            queryset = queryset.filter(release_date=query_params['release_date'])  # Use exact match for date

        if 'price' in query_params:
            queryset = queryset.filter(price=query_params['price'])  # Use exact match for price

        if 'description' in query_params:  
            queryset = queryset.filter(description__icontains=query_params['description'])

        if 'id' in query_params:
            queryset = queryset.filter(id=query_params['id'])  # Use exact match for ID

        return queryset

class GameCreateView(generics.CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    parser_classes = [MultiPartParser, FormParser]  # Allow file uploads

class GameDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    parser_classes = [MultiPartParser, FormParser]  # Allow file uploads
