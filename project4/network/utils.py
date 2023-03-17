from .models import *
from .serializers import *


def get_threads(user, following):
    # Get all posts, reposts, replies and quotes of  user and user's following
    posts = list(Post.objects.filter(Q(user=user) | Q(user__in=following)))
    reposts = list(Repost.objects.filter(Q(user=user) | Q(user__in=following)))
    replies = list(Reply.objects.filter(Q(user=user) | Q(user__in=following)))
    quotes = list(Quote.objects.filter(Q(user=user) | Q(user__in=following)))

    # Serialize the querysets
    post_serializer = PostSerializer(posts, many=True)
    repost_serializer = RepostSerializer(reposts, many=True)
    reply_serializer = ReplySerializer(replies, many=True)
    quote_serializer = QuoteSerializer(quotes, many=True)

    # Reurn the data of the serialized feed
    data = {
        'user': UserSerializer(user).data,
        'posts': post_serializer.data,
        'replies': repost_serializer.data,
        'quotes': reply_serializer.data,
        'reposts': quote_serializer.data,
    }
    return data






# Same thing than the function above put too much line of code 
'''
def get_user_thread(user_id):

    user = User.objects.get(pk=user_id)

    data = [
        {
            'user': user.id,
            'posts': list(user.posts.all().order_by('-timestamp')),
            'replies': list(user.replys.all().order_by('-timestamp')),
            'quotes': list(user.quotes.all().order_by('-timestamp')),
            'reposts': list(user.reposts.all().order_by('-timestamp')),
        }
    ]
    return data
'''


'''
def get_following_thread(user_id):
    user = User.objects.get(pk=user_id)

    user_following = user.followings.order_by('?')[:15]
    followings = [following.following for following in user_following]

    threads = []
    for user in followings:
        threads.append(
            {
                'user': user.id,
                'posts': list(user.posts.all().order_by('-timestamp')),
                'replies': list(user.replys.all().order_by('-timestamp')),
                'quotes': list(user.quotes.all().order_by('-timestamp')),
                'reposts': list(user.reposts.all().order_by('-timestamp')),
            }
        )

    thread = sorted(threads, key=lambda x: x['user'])
    return thread
'''


'''
def get_threads(user_id):
    user_thread = get_user_thread(user_id) 
    following_thread = get_following_thread(user_id)
    
    threads = user_thread + following_thread
    return threads

thread2 = Post.objects.filter(Q(user=user) | Q(user__in=followings))
'''