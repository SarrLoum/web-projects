from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.db import IntegrityError
from django.db.models import Q
import random


from .models import *
from .serializers import *
from .utils import *


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        user_serializer = UserSerializer(user)
        # Add custom claims
        token['user'] = user_serializer.data
        # ...
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class Register(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Ensure password match confirmation
        password = request.data.get("password")
        confirmation = request.data.get("confirmation")


        if password != confirmation:
            return Response({'error': 'Password does not match.'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        try:
            user = serializer.save()
            # Generate refresh token using TokenRefreshView
            refresh_token = TokenRefreshView().get_serializer().get_token(user)

            response_data = {
                'user': UserSerializer(user).data,
                'access_token': str(refresh_token.access_token),
                'refresh_token': str(refresh_token),
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'error': 'Instance already exists.'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

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

        serialized_data = get_threads(user, following)

        serialized_data = {key: value.data for key, value in serialized_data.items()}
        return Response(serialized_data)


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

        serializers = {
            'object': obj,
            'replies': ReplySerializer(obj.replies.all(), many=True),
        }

        data = {key: value.data for key, value in serializers.items()}
        return Response(data)

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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Replying(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, format=None):
        # dynamically set the name of the argument and the instance that is
        # passed to the save() method of the Serializer
        type = request.query_params.get('type')
        parent_obj = request.data.get(type)

        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, **{type: parent_obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Quoting(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, format=None):
        type = request.query_params.get('type')
        parent_obj = request.data.get(type)

        serializer = QuoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, **{type: parent_obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Reposting(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk, format=None):

        type = request.query_params.get('type')
        parent_obj = get_object(pk, type)

        serializer = RepostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, **{type: parent_obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Metrics(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk, format=None):
        type = request.query_params.get('type')
        obj = get_object(pk, type)

        serializers = get_metrics(obj)
        data = {key: value.data for key, value in serializers.items()}
        return Response(data)


class LikePost(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, format=None):
        type = request.query_params.get('type')
        obj = get_object(pk, type)

        serializer = LikeSerializers(obj, request.data)

        if serializer.is_valid():
            serializer.save(likes=request.user, **{type: obj})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class Inbox(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        chatboxes = ChatBox.objects.filter(Q(user1=user) | Q(user2=user))
        serializers = ChatBoxSerializer(chatboxes, many=True)

        data = {
            'chatboxes': serializers.data
        }
        return Response(data, status=status.HTTP_200_OK)
    
class ChatBoxView(APIView):
    def get(self, request, pk, format=None):
        chatbox = ChatBox.objects.get(id=pk)
        chats = chatbox.chats.all().order_by('timestamp')

        chats_serializer = ChatSerializer(chats, many=True)
        return Response(chats_serializer.data, status=status.HTTP_200_OK)



class Suggestion(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk , format=None):
        user = request.user

        followings = get_following(user)
        all_users = User.objects.exclude(id=pk)

        suggestions = []
        for suggest in all_users:
            if suggest not in followings:
                suggestions.append(suggest)
            else:
                pass
        
        serializers = UserSerializer(suggestions, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

class Trending(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk, format=None):
        trends = Likes.objects.all().order_by('likes')[:5]

        serializers = LikeSerializer(trends, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)