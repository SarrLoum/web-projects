# Generated by Django 4.2.1 on 2023-05-27 23:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0012_alter_chat_chatbox'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatbox',
            name='name',
            field=models.CharField(default='chatbox', max_length=100),
        ),
    ]