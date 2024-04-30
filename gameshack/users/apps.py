from django.apps import AppConfig

class YourAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    verbose_name = 'users'

# Register AppConfig in settings.py:
# INSTALLED_APPS = [
#     ...
#     'your_app.apps.YourAppConfig',
#     ...
# ]
