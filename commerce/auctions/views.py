from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.db.models import Q
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.http import JsonResponse
import json

from django.contrib import messages

from .forms import ListingForm, CommentForm
from .models import *
from .util import *

def index(request):
    user = request.user
    # Create an objects of all the active listing
    active_list = Listing.objects.filter(active=True)

    is_viewed_listings= None
    viewed_listings = None
    if user.is_authenticated:
        # User's recently viewed itemsl
        is_viewed_listings = RecentlyViewed.objects.filter(user=request.user.id)
        viewed_listings = user.viewed_listings.all().order_by("-timestamp")[:2]

    # get categories in correct format 
    categoryList = get_categories()
    suggestions = Suggestion.objects.all()
    enchere = ImgCategory.objects.get(view_url="enchères")
    serialized_enchere = {
                            'name': enchere.category.key,
                        }

    return render(request, "auctions/index.html", {
        "active_listing": active_list,
        "categories": categoryList,
        "suggestions": suggestions,
        "enchere": serialized_enchere,
        "is_viewed_listings": is_viewed_listings,
        "user_viewed_listings": viewed_listings
    })



def category_img(request):
    # Create an objects of all the Category Illustration images 
    categories = ImgCategory.objects.all()

    serialized_data = [category.serialize() for category in categories]
    return JsonResponse(serialized_data , safe=False)



def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")



def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))



def register(request):
    if request.method == "POST":
        firstname = request.POST["firstname"]
        lastname = request.POST["lastname"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new 
        username = f"{firstname} {lastname}" 
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


@login_required
def new_listing(request):
    if request.method == "POST":
        category_key = request.POST.get("category").strip()
        print("choosen category on the form: ", category_key)
        listing_form = ListingForm(request.POST, request.FILES)

        if listing_form.is_valid():
            category = get_object_or_404(Category, key=category_key)  # Get the Category instance

            new_listing = listing_form.save(commit=False)
            new_listing.category = category
            new_listing.owner = request.user
            new_listing.save()

            return render(request, "auctions/new_listing.html", {
                "added_listing": new_listing,
                "is_added": True

            })

        else:
            print("Error occcured on the form", listing_form.errors)

    else:
        listing_form = ListingForm()

    return render(request, "auctions/new_listing.html", {
        "listing_form": listing_form
    })


def listing_page(request, listing_id):
    listing = Listing.objects.get(pk=listing_id)        # Retrieve listing 


    # is listing posted(owned) by the current user?
    user = request.user 
    owner = is_owner(listing, user)
    if user.is_authenticated:
        # Mark as viewed by user
        viewed, created = RecentlyViewed.objects.get_or_create(listing=listing, user=user)
        viewed.save()

    # Get the comments/ratings
    comments = listing.comments.all()
    ratings = ratings_level(comments)
    comment_form = CommentForm()    # Set the comment form

    similars = similar_listings(listing)    # Get similar listings


    return render(request, "auctions/listing.html", {
        "listing": listing,
        "usr_is_owner": owner,
        "comments": comments,
        "ratings": ratings,
        "similar_items": similars,
        "comment_form": comment_form,
    })


def close_listing(request, listing_id):
    # Get the listing or return a 404 error page if not found
    listing = get_object_or_404(Listing, pk=listing_id)

    # Ensure that the user requesting the closure is the owner of the listing
    if listing.owner != request.user:
        return HttpResponseForbidden("You are not the owner of this listing.")

    # Update the active status of the listing using F expression
    listing.active = False
    close_listing_notifications()
    return HttpResponseRedirect(reverse("listing-page", args=(listing_id, )))


def add_watchlist(request, listing_id):
    # Get Listing Objects and current user 
    listing = Listing.objects.get(pk=listing_id)
    current_user = request.user

    # Add listing object to user's watchlist and redirect
    listing.watchlist.add(current_user)
    return HttpResponseRedirect(reverse("listing-page", args=(listing_id, )))


def rm_watchlist(request, listing_id):
    # Get Listing Objects and current user 
    listing = Listing.objects.get(pk=listing_id)
    current_user = request.user

    # Add listing object to user's watchlist and redirect
    listing.watchlist.delete(current_user)
    return HttpResponseRedirect(reverse("listing-page", args=(listing_id, )))


def watchlist(request):
    current_user = request.user
    user = User.objects.get(pk=current_user.id)
    watched = user.watchlistings.all()
    return render(request, "auctions/watchlist.html", {
        "watched": watched
    })


def add_bid(request, listing_id):
    listing = Listing.objects.get(pk=listing_id)

    if request.method == "POST":
        try:
            amount = float(request.POST['bidding'])
        except (ValueError, KeyError):
            messages.error(request, 'Invalid bid amount.')
            return HttpResponseRedirect(reverse("listing-page", args=(listing_id, )))

        current_price = get_price(request, listing_id)

        if amount > current_price:
            new_bidding = Bid(bid=amount)
            new_bidding.listing = listing
            new_bidding.user = request.user
            new_bidding.save()

            listing.winning_bid = amount
            listing.save()

            close_listing_notifications()

            messages.success(request, 'Bid submitted successfully.')
        else:
            messages.error(request, 'Invalid submission, your bid is lower than the current price.')

    return HttpResponseRedirect(reverse("listing-page", args=(listing_id, )))


def add_comment(request, listing_id):

    listing = Listing.objects.get(pk=listing_id)
    #if it is a POST (method) we need to process the form data
    if request.method == "POST":
        comment_form = CommentForm(request.POST)

        # save the comment the form is valid
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)

            new_comment.listing = listing
            new_comment.author = request.user
            new_comment.save()

            return HttpResponseRedirect(reverse("listing-page", args=(listing_id, )))



def search(request):
    if request.method == "POST":
        query = request.POST["q"]
        on_category = request.POST["search-category"]

        search_on_category(query, on_category)




def category_view(request, category_name):
    html_link = get_category_view(category_name)
    return render(request, html_link)


def get_user(request):
    user = request.user
    user_data = user.serialize() if user.is_authenticated else None
    notifications = Notification.objects.filter(Q(listing_owner=user) | Q(recipients=user))
    return JsonResponse({"user": user_data, "notifications": notifications}, status=200)
