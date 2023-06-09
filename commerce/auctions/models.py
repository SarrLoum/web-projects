from django.contrib.auth.models import AbstractUser
from django.db import models


from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    pass


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
        return dict(CATEGORIES)
    
    @classmethod
    def get_key(cls, name):
        return cls.get_key_map()[name]

    def __str__(self):
        return self.name

class ImgCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="illustrations")
    image1 = models.ImageField()
    image2 = models.ImageField()
    image3 = models.ImageField()

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
    category = models.ForeignKey(Category, on_delete=models.CASCADE, max_length=100)
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