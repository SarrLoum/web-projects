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
    post_serializer = PostSerializer(list(Post.objects.filter(Q(user=user) | Q(user__in=following))), many=True)
    repost_serializer = RepostSerializer(list(Repost.objects.filter(Q(user=user) | Q(user__in=following))), many=True)
    reply_serializer = ReplySerializer(list(Reply.objects.filter(Q(user=user) | Q(user__in=following))), many=True)
    quote_serializer = QuoteSerializer(list(Quote.objects.filter(Q(user=user) | Q(user__in=following))), many=True)

    # Reurn the data of the serialized feed
    data = {
        'user': UserSerializer(user).data,
        'posts': post_serializer.data,
        'replies': repost_serializer.data,
        'quotes': reply_serializer.data,
        'reposts': quote_serializer.data,
    }
    return data


def get_instance_type(request):
    post = request.data.get('post')
    reply = request.data.get('reply')
    quote = request.data.get('quote')

    if post is not None:
        return 'post'
    elif reply is not None :
        return 'reply'
    else:
        return 'quote'




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