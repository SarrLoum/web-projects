from django.contrib import admin

# Register your models here.

from .models import User, Email, WallPaper, MailerApp

admin.site.register(User)
admin.site.register(Email)
admin.site.register(WallPaper)
admin.site.register(MailerApp)