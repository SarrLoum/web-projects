from markdown2 import Markdown
from django.shortcuts import render

from . import util
from .forms import PageForm

from random import choice


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })



def entry(request, title):
    # Converts content to html
    html_content = convert_md_to_html(title)
    
    # Check if content exist and render content or error message
    if html_content == None:
        return render(request, "encyclopedia/error.html", {
            "message": "This entry does not exist"
        })
    else: 
        return render(request, "encyclopedia/entry.html", {
            "title": title,
            "content": html_content
        })



def search(request):
    # if this is a POST request we need to process the form data
    if request.method == "POST":

        # Get the input value and convert the content of that entry to html
        search_entry = request.POST['q']
        html_content = convert_md_to_html(search_entry)

        # if the title exist return its content
        if html_content is not None:
            return render(request, "encyclopedia/entry.html", {
            "title": search_entry,
            "content": html_content
        })

        else:
            # Get list of all the entries and declare an Empty list(recommendations) 
            entries = util.list_entries()
            recommendations = []

            # Loop through entries  
            for entry in entries:
                #check if input match one of the entries and append it to recommendations
                if search_entry.lower() in entry.lower():
                    recommendations.append(entry)

            # return the list of recommendtions and render it
            return render(request, "encyclopedia/search.html", {
                "recommendations": recommendations
            })



def newpage(request):

    # if this is a POST request we need to process the form data
    if request.method == "POST":

        title = ""
        content = ""

        form = PageForm(request.POST)

        # Check if form is valid
        if form.is_valid():
            # get data from each form field
            title = form.cleaned_data.get("title")
            content = form.cleaned_data.get("content")

            # Save the newly created page 
            util.save_entry(title, content)

            # Convert content to html
            html_content = convert_md_to_html(title)

            return render(request, "encyclopedia/entry.html", {
                "title": title,
                "content": html_content
            })

    # if this is a Get (or any other method) we'll create a blank form
    else:
        form = PageForm()

    return render(request, "encyclopedia/newpage.html", {
        "newpageform": form
    })


def edit(request):
    # if this is a POST request we need to process the form data
    if request.method == "POST":
        # Get the tile of the entry and its content
        title = request.POST['entry_title']
        entry_content = util.get_entry(title)
        # store the page to render into an httpresponse object 
        response = render(request, "encyclopedia/editpage.html", {
            "title": title,
            "content": entry_content
        })
        return response



def save_edit(request):
    # This is a POST request we need to process the form data
    if request.method == "POST":
        title = request.POST['title']
        content = request.POST['content']

        # Save the edit
        util.save_entry(title, content)

        # convert to html
        html_content = convert_md_to_html(title)
    
        # Check if content exist and render content or error message
        return render(request, "encyclopedia/entry.html", {
            "title": title,
            "content": html_content
        })



def random(request):
    # get the list of al entries and randomly choose a entry title to render
    entries = util.list_entries()
    entry_title = choice(entries)

    return render(request, "encyclopedia/entry.html", {
        "title": entry_title,
        "content": convert_md_to_html(entry_title)
    })




# Function that convert content from markdown to hmtl
def convert_md_to_html(title):
    # Get the content using get_entry function from util.py
    content = util.get_entry(title)
    markdowner = Markdown()

    # check if file exist/or not and return the content in html 
    if content == None:
        return None
    else:
        return markdowner.convert(content)

    
