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

    # Check if the query corresponds to a user
    user_result = User.objects.filter(
        Q(first_name__contains=query) |
        Q(last_name__contains=query) |
        Q(email__contains=query) 
    ).first()

    # Initialize an empty list for serialized users
    serialized_users = []

    # If a user was found, serialize it
    if user_result:
        serialized_users.append(user_result.serialize())

    # Filter emails based on recipients if user was found
    if user_result:
        query_result2 = Email.objects.filter(
            Q(subject__contains=query) |
            Q(body__contains=query) |
            Q(recipients=user_result)
        )

        # Serialize Email objects using the custom method
        serialized_emails = [email.serialize() for email in query_result2]
    else:
        query_result2 = Email.objects.none()
        serialized_emails = []

    final_result = list(chain(serialized_users, serialized_emails))
    return final_result


# Define the update_cached_notes function to update the cache
def update_cached_notes():
    # Similar to the code in your get_notes function
    # Fetch data, combine, sort, and update cache as needed
    pass


