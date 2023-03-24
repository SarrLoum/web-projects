
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
    path('feed/', UserFeed.as_view(), name="feed"),
    path('compose/cube/', Post.as_view(), name="post"),
    path('compose/cube/', Reply.as_view(), name="reply"),
    path('compose/cube/', Quote.as_view(), name="quote"),
    path('compose/cube/', Repost.as_view(), name="repost"),
    path('<str:username>/Follow', Follow.as_view(), name="follow"),
    path('<str:username>/thread/<int:id>/', Thread.as_view(), name="thread"),

]

urlpatterns = format_suffix_patterns(urlpatterns)
