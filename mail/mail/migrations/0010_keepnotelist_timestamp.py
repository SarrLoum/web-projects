# Generated by Django 4.2.1 on 2023-08-22 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mail', '0009_rename_keppnote_keepnote'),
    ]

    operations = [
        migrations.AddField(
            model_name='keepnotelist',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]