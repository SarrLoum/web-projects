from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib.auth import authenticate, login, logout


from django.db.models import Q
from django.http import Http404

from .models import *
from .serializers import *
from .utils import *


class Register(APIView):
    
    def post(sef, request, format=None):
        username= request.data.get["username"]
        email = reuest.data.get["email"]

        # Ensure password match confirmation
        password = request.data.get["password"]
        confirmation = request.data.get["confirmation"]

        if password != confirmation:
            return Response({'error': 'Password does not match.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'succes': "Congrats, You've succesfully created your account."}, status=status.HTTP_400_BAD_REQUEST)


        try:
            # Attempt to create a new instance
            # If it already exists, an IntegrityError will be raised
            user = User.Objects.create(username=username, email=email, password=password)
        except IntegrityError:
            return Response({'error': 'Instance already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        token, created = Token.objects.get_or_create(user=user)
        return Response({'success': 'Instance created successfully.'}, status=status.HTTP_201_CREATED)


class LogIn(APIView):

    def post(self, request):

        # Attempt to sign user in
        username = request.Post["username"]
        password = request.Post["username"]
        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class LogOut(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        # Remove the authentication token from the user's session, cookie or localStorage
        request.user.auth_token.delete()

        return Response(status=status.HTTP_200_OK)


class UserTL(APIView):

    def get(self, request, format=None):
        user = request.user
        following = get_following(user)

        data = get_threads(user, following)
        return Response(data)


class Thread(APIView):
    
    def get(self, request, pk, format=None):
        type = request.query_params.get('type')
        obj = get_object(pk, type)

        data = {
            'object': obj,
            'replies': obj.replies.all() ,
            'quotes': obj.quotes.all(),
        }
        return data

    def put(self, request, pk, format=None):
        type = request.query_params.get('type')
        obj = get_object(pk, type)

        serializer = obj_serializer(request, obj, type)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        type = request.query_params.get('type')
        obj = get_object(pk, type)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



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
        #dynamically set the name of the argument and the instance that is 
        # passed to the save() method of the Serializer
        type = get_obj_type(request)
        parent_obj = request.data.get(type)
        
        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, **{type: parent_obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Quote(APIView):
    def post(self, request, format=None):
        type = get_obj_type(request)
        parent_obj = request.data.get(type)
    
        serializer = QuoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, **{type: parent_obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

        
class Repost(APIView):
    def post(self, request, format=None):
        
        type = get_obj_type(request)
        parent_obj = request.data.get(type)
    
        serializer = RepostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, **{type: parent_obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
