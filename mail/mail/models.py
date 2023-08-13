from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    avatar = models.ImageField(blank=True)

    def serialize(self):
        return {
            "id": self.id,
            "firstname": self.first_name,
            "lastname": self.last_name,
            "email": self.email,
            "avatar": str(self.avatar.url) if self.avatar else None
        }


class Email(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="emails")
    sender = models.ForeignKey("User", on_delete=models.PROTECT, related_name="emails_sent")
    recipients = models.ManyToManyField("User", related_name="emails_received")
    subject = models.CharField(max_length=255)
    body = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    starred = models.BooleanField(default=False)
    spam = models.BooleanField(default=False)
    trash = models.BooleanField(default=False)

    @property
    def sender_avatar(self):
        return self.sender.avatar.url if self.sender.avatar else None

    @property
    def user_avatar(self):
        return self.user.avatar.url if self.user.avatar else None

    def serialize(self):
        return {
            "id": self.id,
            "sender": self.sender.serialize(),
            "recipients": [user.email for user in self.recipients.all()],
            "subject": self.subject,
            "body": self.body,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            "read": self.read,
            "archived": self.archived,
            "starred": self.starred,
            "spam": self.spam,
            "trash": self.trash,
        }
class ParentLabelNote(models.Model):
    name = models.CharField(max_length=100)


class LabelNote(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(ParentLabelNote, on_delete=models.CASCADE, related_name="child_notes", blank=True, null=True)


class WallPaper(models.Model):
    image = models.ImageField()


class MailerApp(models.Model):
    icon = models.ImageField()
    name = models.CharField(max_length=50)
    app_url = models.CharField(max_length=150, blank=True)
    
    def serialize(self):
        return {
            "icon": self.icon.url,
            "name": self.name,
            "appUrl": self.app_url
        }

    