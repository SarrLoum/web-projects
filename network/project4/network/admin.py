from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Follow)
admin.site.register(Post)
admin.site.register(Reply)
admin.site.register(Repost)
admin.site.register(Quote)
admin.site.register(Likes)



