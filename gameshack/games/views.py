from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import Game
from .serializers import GameSerializer

class GameListView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = [SearchFilter]
    search_fields = [ 'developer__name', 'description', 'title', 'price', 'release_date', 'id']

    def get_queryset(self):
        queryset = super().get_queryset()
        query_params = self.request.query_params

        if 'price' in query_params:
            price = query_params['price']
            queryset = queryset.filter(price__lte=price)
            return queryset
        
        if 'developer' in query_params:
            developer = query_params['developer']
            queryset = queryset.filter(developer__name=developer)
            return queryset
        
        if 'release_date' in query_params:
            release_date = query_params['release_date']
            queryset = queryset.filter(release_date=release_date)
            return queryset
        
        if 'title' in query_params: 
            title = query_params['title']
            queryset = queryset.filter(title__icontains=title)
            return queryset
        
        if 'description' in query_params:
            description = query_params['description']
            queryset = queryset.filter(description__icontains=description)
            return queryset
        
        if 'id' in query_params:
            id = query_params['id']
            queryset = queryset.filter(id=id)
            return queryset
        
        return queryset
# Create your views here.

class GameCreateView(generics.CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(developer=self.request.user)

class GameDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    parser_classes = [MultiPartParser, FormParser]
