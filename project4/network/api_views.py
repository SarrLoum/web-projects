from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q


from .models import *
from .serializers import *
from .utils import get_threads, get_following, get_follower

class UserFeed(APIView):

    def get(self, request, format=None):
        user = request.user
        user_following = user.followings.all()

        following = [following.following for following in user_following]

        data = get_threads(user, following)
        return Response(data)


class Follow(APIView):

    def get(self, request, Format=None):
        user = request.user

        # Get the user's follofowing ond follower
        follower = get_follower(user)
        following = get_following(user)

        # Serialise the follow instance
        follow = {'follower': follower, 'following': following}
        serializer = FollowSerializer(follow)

        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FollowSerializer(data=request.data)

        if serializer.is_valid():
            sarializer.save(follower=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        # get The follow object where follower = request.user and following = request.data.get('following')
        follow = Follow.objects.get(follower=request.user, following=request.data.get('following'))
        
        follow.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Post(APIView):

    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Reply(APIView):
    def post(self, request, format=None):
        pk = requesr.data.get('post_id')
        reply = Post.objects.get(pk=pk)
    
        serializer = ReplySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, reply=reply)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Quote(APIView):
    def post(self, request, format=None):
        pk = request.data.quote_id
        quote = Post.objects.get(pk=pk)
    
        serializer = QuoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, quote=quote)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

        
class Repost(APIView):
    def post(self, request, format=None):
        pk = request.data.reply_id
        repost = Post.objects.get(pk=pk)
    
        serializer = RepostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, repost=repost)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
