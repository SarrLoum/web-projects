# Generated by Django 4.2.1 on 2023-06-23 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mail', '0002_user_avatar'),
    ]

    operations = [
        migrations.CreateModel(
            name='WallPaper',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
    ]