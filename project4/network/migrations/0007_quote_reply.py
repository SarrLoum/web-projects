# Generated by Django 4.1.5 on 2023-03-13 22:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0006_quote_parent_quote_reply_parent_reply_repost_quote_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='quote',
            name='reply',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='quotes', to='network.reply'),
        ),
    ]
