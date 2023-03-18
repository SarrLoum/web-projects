
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

from .api_views import *



urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),


    #API Views
    path('home/', UserFeed.as_view(), name="feed"),
    path('<str:username>/Follow', Follow.as_view(), name="follow"),
    path('<str:username>/status/<int:thread_id>/', Follow.as_view(), name="follow"),
    path('compose/cube/', Post.as_view(), name="post"),
    path('compose/cube/', Reply.as_view(), name="reply"),
    path('compose/cube/', Quote.as_view(), name="quote"),
    path('compose/cube/', Repost.as_view(), name="repost"),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)
