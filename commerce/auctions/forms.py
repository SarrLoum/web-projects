from django import forms

from .models import Listing


class ListingForm(forms.ModelForm):
    
    class Meta:
        model = Listing
        fields = ("title", "category", "starting_bid", "image", "description")
