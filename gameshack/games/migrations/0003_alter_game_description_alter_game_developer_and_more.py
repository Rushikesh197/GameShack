# Generated by Django 5.0.4 on 2024-04-30 14:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_alter_game_description_alter_game_developer_and_more'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='game',
            name='developer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.gamedeveloper'),
        ),
        migrations.AlterField(
            model_name='game',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
        migrations.AlterField(
            model_name='game',
            name='release_date',
            field=models.DateField(),
        ),
        migrations.AlterModelTable(
            name='game',
            table='games_game',
        ),
    ]
