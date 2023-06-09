from django.contrib.auth.models import AbstractUser
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class User(AbstractUser):
    birthdate = models.DateField(null=True, blank=True)

class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followings')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')


class Profile(models.Model):
    avatar = models.ImageField(blank=True)
    imgcover = models.ImageField(blank=True)
    pseudo_name = models.CharField(max_length=20,)
    bio = models.CharField(max_length=200, blank=True)
    location = models.CharField(blank=True, max_length=50)
    website = models.URLField(max_length=200, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    def __str__(self):
        return self.pseudo_name
# Function that automaticallly creates a user profile
# when a new user is created 
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, pseudo_name=instance.username)

# Abstract Base Post Model that allow Post, 
# Reply and Quotes model to inherits its fields
#Field that take mutiple media type
class BasePost(models.Model):
    text = models.CharField(max_length=280)
    media = models.FileField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="%(class)ss")
    class Meta:
        abstract = True
    
    def __str__(self):
        return self.text

# Post, Reply and Quote model
class Post(BasePost):
    is_post = models.BooleanField(default=True)
    pass


class Reply(BasePost):
    is_reply = models.BooleanField(default=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True, related_name="replies")
    quote = models.ForeignKey('Quote', on_delete=models.CASCADE, null=True, blank=True, related_name="replies")
    parent_reply = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name="replies")


class Quote(BasePost):
    is_quote = models.BooleanField(default=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True, related_name="quotes")
    reply = models.ForeignKey(Reply, on_delete=models.CASCADE, null=True, blank=True, related_name="quotes")
    parent_quote = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name="quotes")


# Repost modal
class Repost(models.Model):
    is_repost = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reposts")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True, related_name="reposts")
    reply = models.ForeignKey(Reply, on_delete=models.CASCADE, null=True, blank=True, related_name="reposts")
    quote = models.ForeignKey(Quote, on_delete=models.CASCADE, null=True, blank=True, related_name="reposts")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reposted by {self.user}"



# Abstract Metric model with the likes, views, shares and impressions fields
class Likes(models.Model):
    likes = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True, related_name="likes")
    reply = models.ForeignKey(Reply, on_delete=models.CASCADE, null=True, blank=True, related_name="likes")
    quote = models.ForeignKey(Quote, on_delete=models.CASCADE, null=True, blank=True, related_name="likes")
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('likes', 'post')

    def __str__(self):
        return self.likes

# Metric models for Post, Reply, and Quotes
class ChatBox(models.Model):
    name = models.CharField(max_length=100, default='chatbox')
    user1 = models.ForeignKey(User, on_delete=models.  CASCADE, related_name='chexboxes_as_user1', blank=True)
    user2 = models.ForeignKey(User, on_delete=models.  CASCADE, related_name='chexboxes_as_user2', blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Set the name based on user1 and user2
        self.name = f"{self.user1.username} & {self.user2.username} chatbox"
        super().save(*args, **kwargs)


class Chat(models.Model):
    text = models.TextField(max_length=300, blank=True)
    media = models.FileField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    chatbox = models.ForeignKey(ChatBox, on_delete=models.CASCADE, related_name='chats', blank=True, null=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_sent')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_received')

    def __str__(self):
        return self.text 

    def save(self, *args, **kwargs):
        if not self.chatbox:
            # Create a new ChatBox if it doesn't exist
            self.chatbox = ChatBox.objects.create(
                user1=self.sender,
                user2=self.recipient,
                name=f"{self.sender} & {self.recipient} chatbox"
            )
            super().save(*args, **kwargs)
