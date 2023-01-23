from markdown2 import Markdown
from django.shortcuts import render

from . import util


# Function that converts the content of a given page title from markdown to html
def convert_md_to_html(title):

    # Get the content using get_entry function from util.py
    content = util.get_entry(title)
    markdowner = Markdown()

    # check if file exist/or not and return the content in html 
    if content == None:
        return None
    else:
        return markdowner.convert(content)




def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

# Function that render entries
def entry(request,):

    return render(request, "encyclopedia/entry.html")

# Function that render create new page
def newpage(request):
    return render(request, "encyclopedia/entry.html", {
    })

# Function that randomly render entries
def random(request):
    return render(request, "encyclopedia/random.html")