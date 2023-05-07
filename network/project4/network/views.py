from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.db import IntegrityError


from .models import *
from .serializers import *
from .utils import *


class Register(APIView):

    def post(self, request, format=None):
        username = request.data.get("username")
        email = request.data.get("email")

        # Ensure password match confirmation
        password = request.data.get("password")
        confirmation = request.data.get("confirmation")

        if password != confirmation:
            return Response({'error': 'Password does not match.'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        try:
            # Attempt to create a new instance
            # If it already exists, an IntegrityError will be raised
            user = User.objects.create_user(
                username=username, email=email, password=password)
        except IntegrityError:
            return Response({'error': 'Instance already exists.'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        return Response({'success': "Congrats, You've succesfully created your account."}, status=status.HTTP_201_CREATED)


class LogIn(APIView):

    def post(self, request):

        # Attempt to sign user in
        username = request.data.get("username")
        password = request.data.get("password")
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
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        following = get_following(user)

        data = get_threads(user, following)
        return Response(data)


class Tendances(APIView):
    def get(self, request, format=None):
        serializers = {
            'posts': PostSerializer(Post.objects.all(), many=True),
            'replies': ReplySerializer(Reply.objects.all(), many=True),
            'quotes': QuoteSerializer(Quote.objects.all(), many=True),
            'reposts': RepostSerializer(Repost.objects.all(), many=True),
        }
        data = {key: value.data for key, value in serializers.items()}
        return Response(data)


class Thread(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk, format=None):
        type = request.query_params.get('type')
        obj = get_object(pk, type)

        data = {
            'object': obj,
            'replies': ReplySerializer(obj.replies.all(), many=True),
            'quotes': QuoteSerializer(obj.quotes.all(), many=True),
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


class FollowView(APIView):

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
            serializer.save(follower=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        # get The follow object where follower = request.user and following = request.data.get('following')
        follow = Follow.objects.get(
            follower=request.user, following=request.data.get('following'))

        follow.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Posting(APIView):

    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Replying(APIView):

    def post(self, request, format=None):
        # dynamically set the name of the argument and the instance that is
        # passed to the save() method of the Serializer
        type = get_obj_type(request)
        parent_obj = request.data.get(type)

        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, **{type: parent_obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Quoting(APIView):
    def post(self, request, format=None):
        type = get_obj_type(request)
        parent_obj = request.data.get(type)

        serializer = QuoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, **{type: parent_obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Reposting(APIView):
    def post(self, request, format=None):

        type = get_obj_type(request)
        parent_obj = request.data.get(type)

        serializer = RepostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, **{type: parent_obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
