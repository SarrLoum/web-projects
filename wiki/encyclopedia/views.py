from markdown2 import Markdown
from django.shortcuts import render

from . import util



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
    return render(request, "encyclopedia/entry.html", {
    })


def random(request):
    return render(request, "encyclopedia/random.html")



def convert_md_to_html(title):
    # Get the content using get_entry function from util.py
    content = util.get_entry(title)
    markdowner = Markdown()

    # check if file exist/or not and return the content in html 
    if content == None:
        return None
    else:
        return markdowner.convert(content)

    
