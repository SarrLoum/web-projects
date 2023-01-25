from django import forms


class NewPageForm(forms.form):
    title = forms.CharField(label="title", max_length=100)
    content = forms.CharField(widget=forms.Textarea)

