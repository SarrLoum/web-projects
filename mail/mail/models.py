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
    important = models.BooleanField(default=False)
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
            "important": self.important,
            "starred": self.starred,
            "spam": self.spam,
            "trash": self.trash,
        }

class KeepNote(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    note = models.CharField(max_length=150, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        keep_note_data = {
            "title": self.title,
            "note": self.note,
            "wichType": "new note",
            "timestamp": self.timestamp.strftime('%Y-%m-%d %H:%M:%S')

        }

        return keep_note_data


class KeepNoteList(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def serialize(self):
        note_items = NoteListItem.objects.filter(notelist=self)
        notelist_data = {
            "title": self.title,
            "noteItems": [note_item.note for note_item in note_items],
            "wichType": "new noteList",
            "timestamp": self.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }
        return notelist_data

class NoteListItem(models.Model):
    note = models.CharField(max_length=150, blank=True, null=True)
    notelist = models.ForeignKey(KeepNoteList, on_delete=models.CASCADE)


class ParentLabelNote(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name



class LabelNote(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(ParentLabelNote, on_delete=models.CASCADE, related_name="child_notes", blank=True, null=True)

    def __str__(self):
        return self.parent



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

    