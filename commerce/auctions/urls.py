from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("category_images", views.category_img, name="category_img"),
    path("category/<str:category_name>", views.category_view, name="category"),

    path("user", views.get_user, name="get-user"),
    path("notifications", views.get_notifications, name="get-notifications"),

    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("new_listing", views.new_listing, name="new_listing"),
    path("watchlist", views.watchlist, name="watched"),
    path("listing/<int:listing_id>", views.listing_page, name="listing-page"),

    path("search/result", views.search, name="search"),
    path("bid/<int:listing_id>", views.add_bid, name="add-bid"),
    path("add_watchlist/<int:listing_id>", views.add_watchlist, name="add-watchlist"),
    path("add_comment/<int:listing_id>", views.add_comment, name="add-comment"),
    path("close_listing/<int:listing_id>", views.close_listing, name="close-listing"),
]
