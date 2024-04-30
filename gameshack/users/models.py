from django.db import models

# Create your models here.
from django.db import models

class NormalUser(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phoneno = models.CharField(max_length=15)
    address = models.TextField()
    dob = models.DateField()
    location = models.CharField(max_length=100)

class GameDeveloper(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phoneno = models.CharField(max_length=15)
    address = models.TextField()
    dob = models.DateField()
    location = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20)
    company_name = models.CharField(max_length=100)
    company_url = models.URLField()
