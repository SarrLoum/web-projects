from django.contrib.auth.models import AbstractUser
from django.db import models


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



class Bids(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bid = models.FloatField()


class Comments(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
