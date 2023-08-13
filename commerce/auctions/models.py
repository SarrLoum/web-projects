from django.contrib.auth.models import AbstractUser
from django.db import models


from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    avatar = models.ImageField(blank=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "avatar": str(self.avatar.url) if self.avatar else None
        }


CATEGORIES = [
    ("art", "Collectibles & art"),
    ("electronics", "Electronics"),
    ("fashion", "Fashion"),
    ("home", "Home & garden"),
    ("automobile", "Auto Parts & Accessories"),
    ("musical", "Musical instruments & gear"),
    ("sports", "Sporting good"),
    ("toys", "Toys & hobbies"),
    ("other", "Other categories"),
]

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    key = models.CharField(max_length=30, unique=True)


    @staticmethod
    def get_key_map():
        return  {key:name for key, name in CATEGORIES}
    
    @classmethod
    def get_name(cls, key):
        return cls.get_key_map().get(key)

    def __str__(self):
        return self.name

class ImgCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="illustrations")
    view_url = models.CharField(max_length=150, blank=True)
    image1 = models.ImageField(blank=True, null=True)
    image2 = models.ImageField(blank=True, null=True)
    image3 = models.ImageField(blank=True, null=True)

    def serialize(self):
        return {
            "category": self.category.key,
            "image1": self.image1.url if self.image1 else None,
            "image2": self.image2.url if self.image2 else None,
            "image3": self.image3.url if self.image3 else None,
        }

    def __str__(self):
        return self.category.name

class Listing(models.Model):
    title = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, max_length=100, blank=True, null=True,related_name="listings")
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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")

    def __int__(self):
        return self.bid



class Comment(models.Model):
    comment = models.TextField()
    rating = models.IntegerField(default=3, validators=[MinValueValidator(0), MaxValueValidator(5)])
    pub_date = models.DateTimeField(auto_now_add=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return self.comment



class Suggestion(models.Model):
    name = models.CharField(max_length=10, default=None)
    image = models.ImageField()

    def __str__(self):
        return self.name


class RecentlyViewed(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="viewed_listings")
    timestamp = models.DateTimeField(auto_now_add=True)