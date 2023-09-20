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
        Q(first_name__contains=query) |
        Q(last_name__contains=query) |
        Q(email__contains=query) 
    )

    query_result2 = Email.objects.filter(
        Q(subject__contains=query) |
        Q(body_contains=query)
    )

    final_result = list(chain(query_result1, query_result2))
    return final_result


# Define the update_cached_notes function to update the cache
def update_cached_notes():
    # Similar to the code in your get_notes function
    # Fetch data, combine, sort, and update cache as needed
    pass


