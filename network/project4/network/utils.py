from django.db.models import Q
from django.http import Http404

from .models import *
from .serializers import *


def get_following(user):
    user_following = user.followings.all()
    followings = [following.following for following in user_following]
    return followings


def get_follower(user):
    user_follower = user.followers.all()
    followers = [follower.follower for follower in user_follower]
    return followers


def get_threads(user, following):
    # Get all posts, reposts, replies and quotes of  user and user's following
    # Serialize the querysets list
    post_serializer = PostSerializer(Post.objects.filter(
        Q(user=user) | Q(user__in=following)), many=True)
    repost_serializer = RepostSerializer(
        Repost.objects.filter(Q(user=user) | Q(user__in=following)), many=True)
    reply_serializer = ReplySerializer(
        Reply.objects.filter(Q(user=user) | Q(user__in=following)), many=True)
    quote_serializer = QuoteSerializer(
        Quote.objects.filter(Q(user=user) | Q(user__in=following)), many=True)

    # Reurn the data of the serialized feed
    return {
        'posts': post_serializer,
        'reposts': repost_serializer,
        'replies': reply_serializer,
        'quotes': quote_serializer,
    }


def get_object(pk, type):
    # Return the correct object if it exist else raie Http404 error
    try:

        if type == 'post':
            return Post.objects.get(pk=pk)
        elif type == 'reply':
            return Reply.objects.get(pk=pk)
        elif type == 'quote':
            return Quote.objects.get(pk=pk)
        else:
            raise Http404

    except (Post.DoesNotExist, Reply.DoesNotExist, Quote.DoesNotExist):
        raise Http404

def get_metrics(obj):
    return {
        'likes': UserSerializer(obj.likes.all(), many=True),
        'replies': ReplySerializer(obj.replies.all(), many=True),
        'reposts': RepostSerializer(obj.reposts.all(), many=True),
        'quotes': QuoteSerializer(obj.quotes.all(), many=True),
    }


def obj_serializer(request, obj, type):
    if type == 'post':
        return PostSerializer(obj, data=request.data)
    elif type == 'reply':
        return ReplySerializer(obj, data=request.data)

    elif type == 'quote':
        return QuoteSerializer(obj, data=request.data)

