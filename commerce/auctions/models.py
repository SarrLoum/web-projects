from django.contrib.auth.models import AbstractUser
from django.db import models

from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    pass

class Listing(models.Model):

    art = "Collectibles & Art"
    electronics = "Electronics"
    fashion = "Fashion"
    home = "Home & Garden"
    automobile = "Auto Part & Accessories"
    musical = "Musical instruments & gear"
    sports = "Sporting good"
    toys = "Toys & hobbies"
    other = "Other categories"

    CATEGORIES = [
        (art, "Collectibles & art"),
        (electronics, "Electronics"),
        (fashion, "Fashion"),
        (home, "Home & garden"),
        (automobile, "Auto Parts & Accessories"),
        (musical, "Musical instruments & gear"),
        (sports, "Sporting good"),
        (toys, "Toys & hobbies"),
        (other, "Other categories"),
    ]

    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=CATEGORIES)
    starting_bid = models.FloatField()
    image = models.ImageField()
    description = models.CharField(max_length=200)
    publication_date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True,related_name="listings")
    active = models.BooleanField(default=True)
    watchlist = models.ManyToManyField(User, blank=True, null=True, related_name="watchlistings")

    def __str__(self):
        return self.title




class Bid(models.Model):
    bid = models.FloatField()
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="bids")
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="clients")

    def __int__(self):
        return self.bid



class Comment(models.Model):
    comment = models.TextField()
    rating = models.IntegerField(default=5, validators=[MinValueValidator(0), MaxValueValidator(5)])
    pub_date = models.DateTimeField(auto_now=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="authors")

    def __str__(self):
        return self.comment


