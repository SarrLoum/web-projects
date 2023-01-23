from django.shortcuts import render

from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def entry(request):
    return render(request, "encyclopedia/entry.html", {
    })

def newpage(request):
    return render(request, "encyclopedia/entry.html", {
    })

def random(request):
    return render(request, "encyclopedia/random.html")