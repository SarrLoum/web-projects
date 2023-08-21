from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(User)
admin.site.register(Email)
admin.site.register(WallPaper)
admin.site.register(MailerApp)
admin.site.register(KeepNote)
admin.site.register(KeepNoteList)
admin.site.register(NoteListItem)
admin.site.register(ParentLabelNote)
admin.site.register(LabelNote)