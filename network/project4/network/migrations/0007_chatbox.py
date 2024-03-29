# Generated by Django 4.2.1 on 2023-05-27 21:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0006_chat'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatBox',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chexboxes_as_user1', to=settings.AUTH_USER_MODEL)),
                ('user2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chexboxes_as_user2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
