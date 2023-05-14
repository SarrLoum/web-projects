from django import forms

from .models import Listing, Comment


class ListingForm(forms.ModelForm):
    
    class Meta:
        model = Listing
        fields = ("title", "category", "starting_bid", "image", "description")


class CommentForm(forms.ModelForm):

    class Meta:
        model= Comment
        fields =("comment", "rating")