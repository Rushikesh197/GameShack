from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = 'List all groups in the database'

    def handle(self, *args, **options):
        all_groups = Group.objects.all()
        self.stdout.write("List of Groups:")
        for group in all_groups:
            self.stdout.write(f"- {group.name}")
