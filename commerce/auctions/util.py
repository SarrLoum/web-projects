from django.db.models import Max
from .models import *


def get_price(resquest, id):

    # Get the starting bid 
    listing = Listing.objects.get(pk=id)
    startingBid = listing.starting_bid

    # Get all the bids made on that listing (highest bid)
    bids = listing.bids.all()

    # Return the current price
    if bids == None:
        price = startingBid
        return price
        
    price = bids.aggregate(Max("bid"))['bid__max']
    return price

