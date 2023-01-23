from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("entry", views.entry, name="entry"),
    path("newpage", views.newpage, name="newpage"),
    path("random", views.random, name="random")
]
