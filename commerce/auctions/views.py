from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from django.contrib import messages


from .models import User, Listing, Bid, Comment
from .forms import ListingForm, CommentForm
from .util import get_price, is_owner


def index(request):

    # Create an objects of all the active listing
    active_list = Listing.objects.filter(active=True)

    return render(request, "auctions/index.html", {
        "active_listing": active_list
    })


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
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
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
    # if it is POST (resquest) method then we need to proceed the form data
    if request.method == "POST":
        listing_form = ListingForm(request.POST, request.FILES)

        if listing_form.is_valid():
            # Create the new listing object and store the current logged in user and then save it to the database
            new_listing = listing_form.save(commit=False)
            new_listing.owner = request.user
            new_listing.save()

        return HttpResponseRedirect(reverse("index"))

    # if it is a Get method then render the form 
    else:
        form = ListingForm()
        return render(request, "auctions/new_listing.html", {
            "listing_form" : form
        })


def listing_page(request, listing_id):
    # get listing id and render all its details 
    listing = Listing.objects.get(pk=listing_id)

    # Check if the listing is posted(owned) by the current user 
    current_usr = request.user 
    owner = is_owner(listing, current_usr)

    # Get all the comments of the listing
    comments = listing.comments.all()

    # listing's comment form

    comment_form = CommentForm()

    # Get the listing's current price
    #listing_price = get_price(request, listing_id)


    return render(request, "auctions/listing.html", {
        "listing": listing,
        "usr_is_owner": owner,
        "comments": comments,
        "comment_form": comment_form,
    })

def close_listing(request, listing_id):
    # Get the listing and close it
    listing = Listing.objects.get(pk=listing_id)
    listing.active = False
    listing.save()

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
    # If it is a POST (method) we need to process the data
    if request.method == "POST":
        amount = int(request.POST['bidding'])
        #Get listing's current price
        current_price = get_price(request, listing_id)

        if amount > current_price:
            new_bidding = Bid(bid=amount)

            # add isting id and user id
            new_bidding.listing = listing
            new_bidding.user = request.user
            new_bidding.save() 
        
            messages.success(request, 'Bid submitted successfully.')
            return HttpResponseRedirect(reverse("listing-page", args=(listing_id, )))
        else:
            messages.error(request, 'Invalid submission, Your bid is lower than the current price.')
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
