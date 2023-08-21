from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("validateCredentials", views.validate_credentials, name="valid-credentials"),

    # API Routes
    path("user", views.get_usr, name="get-user"),
    path("mailer/apps", views.get_apps, name="get-apps"),
    path("emails", views.compose, name="compose"),
    path("emails/<int:email_id>", views.email, name="email"),
    path("emails/<str:mailbox>", views.mailbox, name="mailbox"),
    path("wallpaper/<int:pk>", views.change_wallpaper, name="wallpaper"),

    # API Routes for KeepNote App
    path("notes/<str:noteType>", views.get_notes, name="get-notes"),
]
