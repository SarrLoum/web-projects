# Generated by Django 4.2.1 on 2023-05-11 15:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0004_replymetric_quotemetric_postmetric'),
    ]

    operations = [
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('likes', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='network.post')),
                ('quote', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='network.quote')),
                ('reply', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='network.reply')),
            ],
            options={
                'unique_together': {('likes', 'post')},
            },
        ),
        migrations.RemoveField(
            model_name='quotemetric',
            name='impressions',
        ),
        migrations.RemoveField(
            model_name='quotemetric',
            name='likes',
        ),
        migrations.RemoveField(
            model_name='quotemetric',
            name='quote',
        ),
        migrations.RemoveField(
            model_name='quotemetric',
            name='shares',
        ),
        migrations.RemoveField(
            model_name='quotemetric',
            name='views',
        ),
        migrations.RemoveField(
            model_name='replymetric',
            name='impressions',
        ),
        migrations.RemoveField(
            model_name='replymetric',
            name='likes',
        ),
        migrations.RemoveField(
            model_name='replymetric',
            name='reply',
        ),
        migrations.RemoveField(
            model_name='replymetric',
            name='shares',
        ),
        migrations.RemoveField(
            model_name='replymetric',
            name='views',
        ),
        migrations.DeleteModel(
            name='PostMetric',
        ),
        migrations.DeleteModel(
            name='QuoteMetric',
        ),
        migrations.DeleteModel(
            name='ReplyMetric',
        ),
    ]
