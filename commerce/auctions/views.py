from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Listing, Bid, Comment
from .forms import ListingForm


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
            new_listing.user = request.user
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
    return render(request, "auctions/listing.html", {
        "listing": listing
    })


@login_required
def watchlist(request):
    # if it is a POST method we need to process the form data
    if request.method == "POST":

        # Get listing and the user id
        listing_id = request.POST['listing-id']
        user_id = request.user.id

        # Insert to WatchList
        if WatchList.objects.filter(listing=listing_id).exist():

            add_watchlist = WatchList(listing = listing_id, user = user_id )
            add_watchlist.save()
            return messages.success(request, 'Listing added successfully.(already exist in watchlist)')
        else:
            add_watchlist = WatchList(listing = listing_id, user = user_id )
            add_watchlist.save()
            return messages.success(request, 'Listing added successfully.')


    
@login_required
def watched(request):

    # Create and object of all the listin added to watchlist
    watched = WatchList.objects.all()
        
