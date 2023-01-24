from markdown2 import Markdown
from django.shortcuts import render

from . import util



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


def newpage(request):
    return render(request, "encyclopedia/entry.html", {
    })


def random(request):
    return render(request, "encyclopedia/random.html")