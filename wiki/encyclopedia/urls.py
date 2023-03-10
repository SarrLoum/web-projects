from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<str:title>", views.entry, name="entry"),
    path("search", views.search, name="search"),
    path("newpage", views.newpage, name="newpage"),
    path("editpage", views.edit, name="editpage"),
    path("save_edit", views.save_edit, name="save_edit"),
    path("entry", views.random, name="random")
]

