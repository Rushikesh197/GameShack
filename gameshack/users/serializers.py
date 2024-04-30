from rest_framework import serializers
from .models import NormalUser, GameDeveloper

class NormalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NormalUser
        fields = '__all__'

class GameDeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameDeveloper
        fields = '__all__'
