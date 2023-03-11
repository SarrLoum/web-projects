from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    birthdate = models.DateField(null=True, blank=True)


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')


class Profile(models.Model):
    avatar = models.ImageField(blank=True)
    imgcover = models.ImageField(blank=True)
    pseudo_name = models.CharField(max_length=20)
    bio = models.CharField(max_length=200)
    location = models.CharField(blank=True, max_length=50)
    website = models.URLField(max_length=200)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")


class BasePost(models.Model):
    text = models.CharField(max_length=280)
    media = models.FileField(upload_to='media/%Y/%m/%d/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="%(class)ss")

    class Meta:
        abstract = True


class Post(BasePost):
    pass


class Reply(BasePost):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="replies")


class Quote(BasePost):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="quotes")


class Repost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reposts")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="reposts")
    timestamp = models.DateTimeField(auto_now_add=True)

class BaseMetric(models.Model):
    likes = models.ManyToManyField(User, related_name="liked_%(class)ss")
    views = models.ManyToManyField(User, related_name="viewed_%(class)ss")
    shares = models.ManyToManyField(User, related_name="shared_%(class)ss")
    impressions = models.ManyToManyField(User, related_name="impressed_%(class)ss")

    class Meta:
        abstract = True

class PostMetric(BaseMetric):
    post = models.OneToOneField(Post, on_delete=models.CASCADE, related_name="metrics")


class ReplyMetric(BaseMetric):
    reply = models.OneToOneField(Reply, on_delete=models.CASCADE, related_name="metrics")


class QuoteMetric(BaseMetric):
    quote = models.OneToOneField(Quote, on_delete=models.CASCADE, related_name="metrics")
