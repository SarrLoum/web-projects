from django import forms
from django.contrib import admin


from .models import *


class ChatAdminForm(forms.ModelForm):
    class Meta:
        model = Chat
        fields = '__all__'

    def clean_chatbox(self):
        chatbox = self.cleaned_data.get('chatbox')
        sender = self.cleaned_data.get('sender')
        recipient = self.cleaned_data.get('recipient')

        if not self.chatbox_id:
            # Create a new ChatBox if it doesn't exist
            chatbox = ChatBox.objects.create(
                user1=sender,
                user2=recipient,
                name=f"{sender.username} & {recipient.username} ChatBox"
            )
        return chatbox

class ChatAdmin(admin.ModelAdmin):
    form = ChatAdminForm

# Register your models here.
admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Follow)
admin.site.register(Post)
admin.site.register(Reply)
admin.site.register(Repost)
admin.site.register(Quote)
admin.site.register(Likes)
admin.site.register(ChatBox)
admin.site.register(Chat)



