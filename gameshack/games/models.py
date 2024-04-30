from django.db import models

class Game(models.Model):
    title = models.CharField(max_length=100)
    developer = models.ForeignKey('users.GameDeveloper', on_delete=models.CASCADE, related_name='games')  # Updated related_name for games.Game
    description = models.TextField(default='')
    release_date = models.DateField(default='2000-01-01')
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    cover_image = models.ImageField(upload_to='game_covers/', blank=True, null=True)

    def __str__(self):
        return self.title
