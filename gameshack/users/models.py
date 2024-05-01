from django.db import models

# Create your models here.
from django.db import models

class NormalUser(models.Model):
    name = models.CharField(max_length=100, default='John Doe')
    email = models.EmailField(unique=True,primary_key=True)
    phoneno = models.CharField(max_length=15, default='')
    address = models.TextField(default='')
    dob = models.DateField(default='2000-01-01')  # Default date of birth (e.g., January 1, 2000)
    location = models.CharField(max_length=100, default='Unknown')
    password = models.CharField(max_length=100, default='default_password')

class GameDeveloper(models.Model):
    name = models.CharField(max_length=100, default='Game Dev')
    email = models.EmailField(unique=True,primary_key=True)
    phoneno = models.CharField(max_length=15, default='')
    address = models.TextField(default='')
    dob = models.DateField(default='1990-01-01')  # Default date of birth (e.g., January 1, 1990)
    location = models.CharField(max_length=100, default='Unknown')
    employee_id = models.CharField(max_length=20, default='')
    company_name = models.CharField(max_length=100, default='Company Name')
    company_url = models.URLField(default='http://example.com')
    password = models.CharField(max_length=100, default='default_password')
