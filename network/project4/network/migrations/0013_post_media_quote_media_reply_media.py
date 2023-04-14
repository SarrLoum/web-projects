# Generated by Django 4.1.5 on 2023-04-08 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0012_remove_post_media_remove_quote_media_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='media',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='quote',
            name='media',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='reply',
            name='media',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
