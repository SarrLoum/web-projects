from django.db.models import Max, Q
from .models import *



def get_price(listing):
    # Get the starting bid 
    starting_bid = listing.starting_bid
    winning_bid = listing.winning_bid

    # Return the current price
    if winning_bid is None or winning_bid.bid == 0:
        return starting_bid
    return winning_bid.bid


def is_owner(listing, user):
    if listing.owner == user:
        return True
    return False



def close_listing_notifications(listing):
    listing_bids = listing.bids.select_related('user')
    recipients = {bid.user for bid in listing_bids}

    notification = Notification(
        title=f"The {listing.title} listing has been closed",
        listing=listing,
        listing_owner=listing.owner
    )
    notification.save()
    notification.recipients.set(recipients)



def auction_winner_notification(listing):
    winning_bid = listing.winning_bid
    winner = Bid.objects.get(bid=winning_bid).select_related("user")

    notification = Notification(
        title=f"Congratulations you've won the auction {listing.title}!!!! \n Winning Bid: {winning_bid}",
        listing=listing,
        listing_owner=listing.owner,
    )
    notification.save()
    notification.recipients.add(winner)  # Add the winner as a recipient




def bid_notifications(listing, amount):
    listing_bids = listing.bids.select_related('user')
    recipients = {bid.user for bid in listing_bids}

    notification = Notification(
        title=f"A new bid of ${amount:.2f} has been made on the {listing.title} listing",
        listing=listing,
        listing_owner=listing.owner
    )
    notification.save()
    notification.recipients.set(recipients)
    



def get_categories():
    # Create an objects of all the Category Illustrations mages 
    categories = ImgCategory.objects.exclude(view_url="enchères")
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



def search_on_category(query, category):
    base_query = Listing.objects.select_related('category', 'owner')

    if category:
        base_query = base_query.filter(category=category)

    if query:
        query_filter = Q(title__icontains=query) | Q(description__icontains=query)
        base_query = base_query.filter(query_filter)

    result = base_query.filter(active=True)
    
    return result

def ratings_level(comments):
    ratings = []
    for i in range(5):
        # sum up the number of comments with rating level i
        count =  sum(1 for comment in comments if comment.rating == i+1)
        # Compute the percante of of comments with level i rating (0 if not rating of level i)
        percentage = count * 100 / len(comments) if count != 0 else 0
        #Add both values as dictionary to the ratings list
        ratings.append({"level": i+1, "percentage": percentage})
    return ratings


def similar_listings(listing):
    similar_items = Listing.objects.filter(
        ~Q(id=listing.id) &
        (
            Q(title__contains=listing.title) | 
            Q(title__contains="NFT") | 
            Q(title__contains="sneaker") | 
            Q(category=listing.category) | 
            Q(description__contains="nft") | 
            Q(description__contains="sneaker")
        )
    )
    return similar_items



def get_category_view(category_name):
    match category_name:
        case 'art':
                return "auctions/Art&collection.html"
        case 'electronics':
                return "auctions/electronics.html"
        case 'fashion':
            return "auctions/fashion.html"      
        case 'home':
            return "auctions/home&garden.html"       
        case 'automobile':
            return "auctions/motors.html"
        case 'musical':
            return "auctions/musical_intrument&gear.html"      
        case 'sports':
            return "auctions/sporting_good.html"      
        case 'toys':
            return "auctions/toys&hobbies.html"        
        case _:
            return None






