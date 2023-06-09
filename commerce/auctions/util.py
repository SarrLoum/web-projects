from django.db.models import Max
from .models import *


def get_price(resquest, id):
    # Get the starting bid 
    listing = Listing.objects.get(pk=id)
    startingBid = listing.starting_bid

    # Get all the bids made on that listing (highest bid)
    bids = listing.bids.all()
    # Return the current price
    if len(bids) == 0:
        price = startingBid
        return price
        
    price = bids.aggregate(Max("bid"))['bid__max']
    return price


def is_owner(listing, user):
    if listing.owner == user:
        return True
    return False


def get_categories():
    # Create an objects of all the Category Illustrations mages 
    categories = ImgCategory.objects.all()
    categoryList = []
    for category in categories:
        categoryDict = { 
            'name': category.category.key, 
            'images': [ 
                category.image1, 
                category.image2, 
                category.image3, 
            ]
        }
        categoryList.append(categoryDict)

    return categoryList


