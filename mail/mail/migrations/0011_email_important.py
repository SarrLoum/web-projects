# Generated by Django 4.2.1 on 2023-09-22 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mail', '0010_keepnotelist_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='important',
            field=models.BooleanField(default=False),
        ),
    ]
