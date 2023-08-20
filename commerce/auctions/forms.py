from typing import Any
from django import forms

from .models import Listing, Comment, Category, CATEGORIES


class ListingForm(forms.ModelForm):
    category = forms.ChoiceField(choices=CATEGORIES)

    class Meta:
        model = Listing
        fields = ("title", "starting_bid", "image", "description")


class CommentForm(forms.ModelForm):

    class Meta:
        model= Comment
        fields =("comment", "rating")
        widgets = {
            "comment": forms.Textarea(attrs={'class': "form-control"}),
        }