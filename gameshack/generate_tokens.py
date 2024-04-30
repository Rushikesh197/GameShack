import os
import django

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gameshack.settings')

# Initialize Django
django.setup()

from django.contrib.auth.models import Group
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

# Get the group
group_name = 'Normal users'
group = Group.objects.get(name=group_name)

# Generate tokens for users in the group
users = group.user_set.all()
for user in users:
    Token.objects.get_or_create(user=user)
    print(f"Token generated for {user.username}")
