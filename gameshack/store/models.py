from django.db import models
from users.models import NormalUser
from games.models import Game

class Cart(models.Model):
    user_email = models.EmailField()
    user = models.ForeignKey(NormalUser, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user_email} - {self.game.title}'

    class Meta:
        # Enforce unique combination of user_email and game
        unique_together = ('user_email', 'game')

class Favorite(models.Model):
    user_email = models.EmailField()
    user = models.ForeignKey(NormalUser, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user_email} - {self.game.title}'

    class Meta:
        # Enforce unique combination of user_email and game
        unique_together = ('user_email', 'game')
