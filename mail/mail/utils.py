import json
from django.core.cache import cache
from django.db import IntegrityError
from django.db.models import  Q
from itertools import chain
from .models import *




def inboxes_count(user):
    # Authenticated users view their inbox
    inboxes = Email.objects.filter(
        Q(user=user) &
        Q(archived=False) &
        Q(starred=False) &
        Q(spam=False) &
        Q(trash=False)
    )
    return inboxes.count() 



def search_query(query):
    query_result1 = User.objects.filter(
        Q(firstname__contains=query),
        Q(lastname__contains=query),
        Q(Email__contains=query)
    )

    pass


# Define the update_cached_notes function to update the cache
def update_cached_notes():
    # Similar to the code in your get_notes function
    # Fetch data, combine, sort, and update cache as needed
    pass


