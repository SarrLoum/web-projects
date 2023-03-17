
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
    path("homepage/", Feed.as_view(), name="feed"),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)
