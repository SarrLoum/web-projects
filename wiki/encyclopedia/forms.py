from django import forms

class PageForm(forms.Form):
    title = forms.CharField(label="title", max_length=100)
    content = forms.CharField(widget=forms.Textarea)

