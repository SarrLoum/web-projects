from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *
from .utils import get_threads

class UserFeed(APIView):

    def get(self, request, format=None):
        user = request.user
        user_following = user.following.all()

        following = [following.following for following in user_following]

        data = get_threads(user, following)
        return Response(data)


class Post(APIView):
    def post(self, request, format=None):
    
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Reply(APIView):
    def post(self, request, format=None):
    
        serializer = ReplySerializer(data=request.data)

        if serializer.is_valid:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Quote(APIView):
    def post(self, request, format=None):
    
        serializer = QuoteSerializer(data=request.data)

        if serializer.is_valid:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

        
class Repost(APIView):
    def post(self, request, format=None):
    
        serializer = RepostSerializer(data=request.data)

        if serializer.is_valid:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
