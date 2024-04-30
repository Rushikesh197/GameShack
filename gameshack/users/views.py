from rest_framework import generics
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import NormalUser, GameDeveloper
from .serializers import NormalUserSerializer, GameDeveloperSerializer

# NormalUser views
class NormalUserListView(generics.ListAPIView):
    queryset = NormalUser.objects.all()
    serializer_class = NormalUserSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'email', 'phoneno', 'address', 'dob', 'location']
    filterset_fields = {
        'name': ['exact', 'icontains'],
        'email': ['exact', 'icontains'],
        'phoneno': ['exact', 'icontains'],
        'address': ['icontains'],
        'dob': ['exact', 'gte', 'lte'],
        'location': ['exact', 'icontains'],
    }

class NormalUserCreateView(generics.CreateAPIView):
    queryset = NormalUser.objects.all()
    serializer_class = NormalUserSerializer

class NormalUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = NormalUser.objects.all()
    serializer_class = NormalUserSerializer

# GameDeveloper views
class GameDeveloperListView(generics.ListAPIView):
    queryset = GameDeveloper.objects.all()
    serializer_class = GameDeveloperSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'email', 'phoneno', 'address', 'employee_id', 'company_name', 'company_url']
    filterset_fields = {
        'name': ['exact', 'icontains'],
        'email': ['exact', 'icontains'],
        'phoneno': ['exact', 'icontains'],
        'address': ['icontains'],
        'employee_id': ['exact', 'icontains'],
        'company_name': ['exact', 'icontains'],
        'company_url': ['exact', 'icontains'],
    }

class GameDeveloperCreateView(generics.CreateAPIView):
    queryset = GameDeveloper.objects.all()
    serializer_class = GameDeveloperSerializer

class GameDeveloperDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GameDeveloper.objects.all()
    serializer_class = GameDeveloperSerializer
