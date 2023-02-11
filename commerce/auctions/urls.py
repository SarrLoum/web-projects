from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("new_listing", views.new_listing, name="new_listing"),
    path("listing/<int:listing_id>", views.listing_page, name="listing-page"),
    path("add_watchlist/<int:listing_id>", views.add_watchlist, name="add-watchlist"),
    path("watchlist", views.watchlist, name="watched"),
    path("bid/<int:listing_id>", views.add_bid, name="add-bid")

]
