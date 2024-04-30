# Generated by Django 5.0.4 on 2024-04-30 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GameDeveloper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phoneno', models.CharField(max_length=15)),
                ('address', models.TextField()),
                ('dob', models.DateField()),
                ('location', models.CharField(max_length=100)),
                ('employee_id', models.CharField(max_length=20)),
                ('company_name', models.CharField(max_length=100)),
                ('company_url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='NormalUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phoneno', models.CharField(max_length=15)),
                ('address', models.TextField()),
                ('dob', models.DateField()),
                ('location', models.CharField(max_length=100)),
            ],
        ),
    ]
