from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import *
from .views_test import *

#from .api_views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    # API Authentification Routes
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api/register/", Register.as_view(), name="register"),
    path("api/logout/", LogOut.as_view(), name="logout"),

    # API Chatbox Routes
    path("api/inbox", Inbox.as_view(), name="inbox"),
    path("api/chatbox/<int:pk>/chats", ChatBoxView.as_view(), name="chatbox"),

    # API Feed Routes
    path('api/timeline', UserTL.as_view(), name="time-line"),
    path('api/tendances', Tendances.as_view(), name='tendances'),
    path('api/thread/<int:pk>/post', Thread.as_view(), name="thread"),

    # API Metrics Routes
    path('api/posts/<int:pk>/metrics', Metrics.as_view(), name='metrics'),
    path('api/posts/<int:pk>/like', LikePost.as_view(), name='likes'),
    path('api/trending', Trending.as_view(), name="trending"),

    # API Compose Routes
    path('api/compose/post', Posting.as_view(), name="post"),
    path('api/posts/<int:pk>/repost', Reposting.as_view(), name="repost"),
    path('api/posts/<int:pk>/reply', Replying.as_view(), name="reply"),
    path('api/posts/<int:pk>/quote', Quoting.as_view(), name="quote"),

    # API Follow Routes
    path('<str:username>/follow', FollowView.as_view(), name="follow"),
    path('api/user/<int:pk>/suggestions', Suggestion.as_view(), name="suggestions"),

]

urlpatterns = format_suffix_patterns(urlpatterns)
