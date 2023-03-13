from django.contrib.auth.models import AbstractUser
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver


# Abstractr User, Follow and Profile models
class User(AbstractUser):
    birthdate = models.DateField(null=True, blank=True)
    


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followings')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')


class Profile(models.Model):
    avatar = models.ImageField(blank=True)
    imgcover = models.ImageField(blank=True)
    pseudo_name = models.CharField(max_length=20)
    bio = models.CharField(max_length=200)
    location = models.CharField(blank=True, max_length=50)
    website = models.URLField(max_length=200)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    def __str__(self):
        return self.user
# Function that automaticallly creates a user's 
# profile when a new user is created 
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, pseudo_name=instance.username)




# Abstract Base Post Model that allow Post, 
# Reply and Quotes model to inherits its fields
class BasePost(models.Model):
    text = models.CharField(max_length=280)
    media = models.FileField(upload_to='media/%Y/%m/%d/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="%(class)ss")

    class Meta:
        abstract = True
    
    def __str__(self):
        return self.text

# Post, Reply and Quote model
class Post(BasePost):
    pass


class Reply(BasePost):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="replies")


class Quote(BasePost):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="quotes")


# Repost modal
class Repost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reposts")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="reposts")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} reposted {self.post}"



# Abstract Metric model with the likes, views, shares and impressions fields
class BaseMetric(models.Model):
    likes = models.ManyToManyField(User, related_name="liked_%(class)ss")
    views = models.ManyToManyField(User, related_name="viewed_%(class)ss")
    shares = models.ManyToManyField(User, related_name="shared_%(class)ss")
    impressions = models.ManyToManyField(User, related_name="impressed_%(class)ss")

    class Meta:
        abstract = True
    
    def __str__(self):
        return self.likes

# Metric models for Post, Reply, and Quotes
class PostMetric(BaseMetric):
    post = models.OneToOneField(Post, on_delete=models.CASCADE, related_name="metrics")


class ReplyMetric(BaseMetric):
    reply = models.OneToOneField(Reply, on_delete=models.CASCADE, related_name="metrics")


class QuoteMetric(BaseMetric):
    quote = models.OneToOneField(Quote, on_delete=models.CASCADE, related_name="metrics")
