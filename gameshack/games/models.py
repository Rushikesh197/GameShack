from django.db import models

class Game(models.Model):
    title = models.CharField(max_length=100)
    developer = models.ForeignKey('users.GameDeveloper', on_delete=models.CASCADE)
    description = models.TextField()
    release_date = models.DateField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    cover_image = models.ImageField(upload_to='game_covers/', blank=True, null=True)
    # Add more fields as needed

    def __str__(self):
        return self.title
