# Generated by Django 3.2.7 on 2021-09-25 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('poster_path', models.CharField(max_length=150)),
                ('tmd_id', models.CharField(max_length=50)),
                ('genre', models.CharField(max_length=50)),
                ('overview', models.TextField()),
                ('production_company', models.CharField(max_length=50)),
                ('homepage', models.CharField(max_length=150)),
                ('release_date', models.CharField(max_length=50)),
                ('backdrop_path', models.CharField(max_length=150)),
                ('director', models.CharField(max_length=100)),
            ],
        ),
    ]