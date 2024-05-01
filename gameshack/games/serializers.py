from rest_framework import serializers
from .models import Game
from users.models import GameDeveloper

class GameSerializer(serializers.ModelSerializer):
    developer_email = serializers.ChoiceField(
        choices=GameDeveloper.objects.values_list('email', flat=True),
        write_only=True,
        help_text="Select developer's email"
    )

    class Meta:
        model = Game
        fields = ['id', 'title', 'developer_email', 'release_date', 'description', 'price', 'cover_image']
        read_only_fields = ['developer']

    def create(self, validated_data):
        developer_email = validated_data.pop('developer_email')
        developer = GameDeveloper.objects.get(email=developer_email)
        
        # Ensure 'developer' is not included in validated_data to prevent conflicts
        if 'developer' in validated_data:
            validated_data.pop('developer')

        game = Game.objects.create(developer=developer, **validated_data)
        return game
