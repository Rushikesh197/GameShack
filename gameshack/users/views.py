from rest_framework import generics
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import NormalUser, GameDeveloper
from .serializers import NormalUserSerializer, GameDeveloperSerializer

class NormalUserListView(generics.ListAPIView):
    queryset = NormalUser.objects.all()
    serializer_class = NormalUserSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name', 'email', 'phoneno', 'address', 'dob', 'location']

    def get_queryset(self):
        queryset = super().get_queryset()
        query_params = self.request.query_params

       # Filter queryset based on URL query parameters
        if 'name' in query_params:
            queryset = queryset.filter(name__icontains=query_params['name'])

        if 'email' in query_params:
            queryset = queryset.filter(email__icontains=query_params['email'])
    
        if 'location' in query_params:
            queryset = queryset.filter(location__icontains=query_params['location'])

        if 'phoneno' in query_params:
            queryset = queryset.filter(phoneno__icontains=query_params['phoneno'])

        if 'address' in query_params:
            queryset = queryset.filter(address__icontains=query_params['address'])

        if 'dob' in query_params:
            queryset = queryset.filter(dob__icontains=query_params['dob'])

        if 'id' in query_params:
            queryset = queryset.filter(id__icontains=query_params['id'])

        return queryset

class NormalUserCreateView(generics.CreateAPIView):
    queryset = NormalUser.objects.all()
    serializer_class = NormalUserSerializer

class NormalUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = NormalUser.objects.all()
    serializer_class = NormalUserSerializer

class GameDeveloperListView(generics.ListAPIView):
    queryset = GameDeveloper.objects.all()
    serializer_class = GameDeveloperSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name', 'email', 'phoneno', 'address', 'employee_id', 'company_name', 'company_url']

    def get_queryset(self):
        queryset = super().get_queryset()
        query_params = self.request.query_params

        # Filter queryset based on URL query parameters
        if 'name' in query_params:
            queryset = queryset.filter(name__icontains=query_params['name'])

        if 'email' in query_params:
            queryset = queryset.filter(email__icontains=query_params['email'])

        if 'company_name' in query_params:
            queryset = queryset.filter(company_name__icontains=query_params['company_name'])

        if 'company_url' in query_params:
            queryset = queryset.filter(company_url__icontains=query_params['company_url'])

        if 'employee_id' in query_params:
            queryset = queryset.filter(employee_id__icontains=query_params['employee_id'])

        if 'phoneno' in query_params:
            queryset = queryset.filter(phoneno__icontains=query_params['phoneno'])

        if 'address' in query_params:
            queryset = queryset.filter(address__icontains=query_params['address'])  

        if 'id' in query_params:
            queryset = queryset.filter(id__icontains=query_params['id'])
            
        return queryset

class GameDeveloperCreateView(generics.CreateAPIView):
    queryset = GameDeveloper.objects.all()
    serializer_class = GameDeveloperSerializer

class GameDeveloperDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GameDeveloper.objects.all()
    serializer_class = GameDeveloperSerializer
