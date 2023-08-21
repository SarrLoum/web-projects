import json
from django.core.cache import cache
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.db.models import  Q
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import *
from .utils import *


def index(request):
    if request.user.is_authenticated:
        total_inbox = inboxes_count(request.user)

        all_wallpapers = WallPaper.objects.all()[:7]
        return render(request, "mail/inbox.html", {
            "all_wallpapers": all_wallpapers,
            "inbox_count": total_inbox
        })

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


@csrf_exempt
@login_required
def compose(request):

    # Composing a new email must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Check recipient emails
    data = json.loads(request.body)
    emails = [email.strip() for email in data.get("recipients").split(",")]
    if emails == [""]:
        return JsonResponse({
            "error": "At least one recipient required."
        }, status=400)

    # Convert email addresses to users
    recipients = []
    for email in emails:
        try:
            user = User.objects.get(email=email)
            recipients.append(user)
        except User.DoesNotExist:
            return JsonResponse({
                "error": f"User with email {email} does not exist."
            }, status=400)

    # Get contents of email
    subject = data.get("subject", "")
    body = data.get("body", "")

    # Create one email for each recipient, plus sender
    users = set()
    users.add(request.user)
    users.update(recipients)
    for user in users:
        email = Email(
            user=user,
            sender=request.user,
            subject=subject,
            body=body,
            read=user == request.user
        )
        email.save()
        for recipient in recipients:
            email.recipients.add(recipient)
        email.save()

    return JsonResponse({"message": "Email sent successfully."}, status=201)


@login_required
def mailbox(request, mailbox):

    # Filter emails returned based on mailbox
    if mailbox == "inbox":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, archived=False
        )
    elif mailbox == "sent":
        emails = Email.objects.filter(
            user=request.user, sender=request.user
        )
    elif mailbox == "archive":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, archived=True
        )
    elif mailbox == "starred":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, starred=True
        )
    elif mailbox == "spam":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, spam=True
        )
    elif mailbox == "trash":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, trash=True
        )
    else:
        return JsonResponse({"error": "Invalid mailbox."}, status=400)

    # Return emails in reverse chronologial order
    emails = emails.order_by("-timestamp").all()
    return JsonResponse([email.serialize() for email in emails], safe=False)


@csrf_exempt
@login_required
def email(request, email_id):

    # Query for requested email
    try:
        email = Email.objects.get(user=request.user, pk=email_id)
    except Email.DoesNotExist:
        return JsonResponse({"error": "Email not found."}, status=404)

    # Return email contents
    if request.method == "GET":
        return JsonResponse(email.serialize())
    # Update whether email is read or should be archived
    elif request.method == "PUT":
        data = json.loads(request.body)
        if data.get("read") is not None:
            email.read = data["read"]
        if data.get("archived") is not None:
            email.archived = data["archived"]
        if data.get("starred") is not None:
            email.starred = data["starred"]
        if data.get("spam") is not None:
            email.spam = data["spam"]
        if data.get("trash") is not None:
            email.trash = data["trash"]
        email.save()
        return HttpResponse(status=204)

    # Email must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)

def login_view(request):
    if request.method == "POST":
        email = request.POST["email"]
        password = request.POST["password"]

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "mail/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "mail/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        email = request.POST["email"]
        
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "mail/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(email, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "mail/register.html", {
                "message": "Email address already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "mail/register.html")


@csrf_exempt  # Make sure to re-apply Ltion
def validate_credentials(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        try:
            user = User.objects.get(email=email)
            return JsonResponse({'user': user.serialize(), 'valid': True, 'message': 'Email is valid'})
        except User.DoesNotExist:
            return JsonResponse({'valid': False, 'message': 'Email is not valid'})



def search_mail(request):
    if request.method == "POST":
        query = request.POST.get("q")

        result = search_query(query)

    return JsonResponse(result, status=200)




from django.http import JsonResponse
from django.core.cache import cache
import json
from itertools import chain
from .models import KeepNote, KeepNoteList, NoteListItem

def get_notes(request):
    cached_data = cache.get('cached_notes')

    if cached_data is None:
        # If cached data is not available, fetch data from the database

        # Fetch all KeepNote instances and KeepNoteList instances ordered by timestamp
        notes = KeepNote.objects.all().order_by("-timestamp")
        note_lists = KeepNoteList.objects.all().order_by("-timestamp")

        # Combine notes and note lists into a single list
        combined_data = list(chain(notes, note_lists))

        # Sort the combined list by timestamp in descending order
        combined_data.sort(key=lambda obj: obj.timestamp, reverse=True)

        # Create a dictionary containing the combined and sorted data
        notes_data = {
            "combined_data": combined_data
        }

        # Cache the data for an hour (3600 seconds)
        cache.set('cached_notes', json.dumps(notes_data), timeout=3600)

    else:
        notes_data = json.loads(cached_data)

    return JsonResponse(notes_data)


def add_notes(request, noteType):
    if request.method == "POST":
        if noteType == "note":
            title = request.POST.get("title")
            note = request.POST.get("note")

            new_note = KeepNote(title=title)
            new_note.note = note
            new_note.save()

        else:
            title = request.POST.get("title")
            note_items = request.POST.getlist("noteItems")

            new_note_list = KeepNoteList(title=title)
            new_note_list.save()

            for note_item in note_items:
                notelist_item = NoteListItem(notelist=new_note_list, note=note_item)
                notelist_item.save()

    # Update the cache after adding a new note or note list
    # update_cached_notes()

    return JsonResponse({'message': 'Note created/edited successfully'})




def get_usr(request):
    user = request.user
    user_data = user.serialize()
    return JsonResponse(user_data, status=200)


def change_wallpaper(request, pk):
    user = request.user
    wallpaper = WallPaper.objects.get(pk=pk)

    data = {
        "user": user.serialize(),
        'id': wallpaper.id,
        'image_url': wallpaper.image.url
    }
    return JsonResponse(data, status=200)



def get_apps(request):
    user = request.user
    apps = MailerApp.objects.all()
    data = {
        "user": user.serialize(),
        "apps": [app.serialize() for app in apps]
    }
    return JsonResponse(data, status=200)


