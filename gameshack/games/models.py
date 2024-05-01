from django.db import models
from users.models import GameDeveloper

class Game(models.Model):
    title = models.CharField(max_length=100)
    developer = models.ForeignKey(GameDeveloper, on_delete=models.CASCADE, to_field='email')
    description = models.TextField()
    release_date = models.DateField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    cover_image = models.ImageField(upload_to='game_covers/', blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'games_game'  # Custom database table name for Game model
