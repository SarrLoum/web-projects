from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import *
from .views_test import *

#from .api_views import *


urlpatterns = [
    path("", index, name="index"),
    path("login", login_view, name="login"),
    path("logout", logout_view, name="logout"),
    path("SignUp", register, name="register"),


    # API Routes
    path("login", LogIn.as_view(), name="login"),
    path("logout", LogOut.as_view(), name="logout"),
    path("register", Register.as_view(), name="register"),

    path('api/feed', UserTL.as_view(), name="time-line"),
    path('api/tendances', Tendances.as_view(), name='tendances'),


    path('compose/post', Posting.as_view(), name="post"),
    path('compose/reply', Replying.as_view(), name="reply"),
    path('compose/quote', Quoting.as_view(), name="quote"),
    path('compose/repost', Reposting.as_view(), name="repost"),
    path('<str:username>/follow', FollowView.as_view(), name="follow"),
    path('<str:username>/thread/<int:id>', Thread.as_view(), name="thread"),

]

urlpatterns = format_suffix_patterns(urlpatterns)
