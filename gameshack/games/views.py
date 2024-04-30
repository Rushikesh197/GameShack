from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Game
from .serializers import GameSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class GameListView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'title': ['exact', 'icontains'],
        'developer__name': ['exact', 'icontains'],
        'release_date': ['exact', 'year__gte', 'year__lte'],
        'price': ['exact', 'gte', 'lte'],
    }

    def get_queryset(self):
        queryset = super().get_queryset()

        # Apply additional query parameters dynamically
        title = self.request.query_params.get('title')
        developer_name = self.request.query_params.get('developer_name')
        release_year = self.request.query_params.get('release_year')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if title:
            queryset = queryset.filter(title__icontains=title)

        if developer_name:
            queryset = queryset.filter(developer__name__icontains=developer_name)

        if release_year:
            queryset = queryset.filter(release_date__year=release_year)

        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset


class GameCreateView(generics.CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    parser_classes = [MultiPartParser, FormParser]  # Allow file uploads

class GameDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    parser_classes = [MultiPartParser, FormParser]  # Allow file uploads
