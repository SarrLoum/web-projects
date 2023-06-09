from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.utils import timezone


from .models import *


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            'id', 'avatar', 'imgcover',
            'pseudo_name', 'bio', 'location', 'website'
        ]


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email',
            'birthdate', 'password', 'profile'
        ]

    def create(self, validated_data):
        # Desttucture the validated_data to get the profile information
        profile_data = validated_data.pop('profile', None)

        # Hash the passsword before creating user 
        password = validated_data.pop('password', None)
        hashed_password = make_password(password) if password else None
        user = User.objects.create(password=hashed_password, **validated_data)

        # Add user's Profile
        if profile_data:
            profile_serializer = ProfileSerializer(data=profile_data)
            profile_serializer.is_valid(raise_exception=True)
            profile = profile_serializer.save(user=user)
            user.profile = profile
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        
        if password:
            instance.set_password(password)
            instance.save()
        
        if profile_data:
            profile_serializer = ProfileSerializer(instance.profile, data=profile_data)
            profile_serializer.is_valid(raise_exception=True)
            profile_serializer.save()
        
        return instance


class FollowSerializer(serializers.ModelSerializer):
    followwer = UserSerializer(many=True)
    followwing = UserSerializer(many=True)

    class Meta:
        model: Follow
        fields = ['follower', 'following']


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Post
        fields = ['id', 'user', 'text', 'media', 'timestamp', 'is_post']

class ReplySerializer(serializers.ModelSerializer):
    user = UserSerializer()
    post = PostSerializer(required=False, allow_null=True)
    parent_reply = serializers.SerializerMethodField()

    def get_parent_reply(self, obj):
        from .serializers import ReplySerializer
        return ReplySerializer(obj.parent_reply).data

    class Meta:
        model = Reply
        fields = [
            'id', 'user', 'text',
            'media', 'timestamp', 'is_reply', 'post', 'parent_reply'
        ]


class QuoteSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    post = PostSerializer(required=False, allow_null=True)
    parent_quote = serializers.SerializerMethodField()

    def get_parent_quote(self, obj):
        from .serializers import QuoteSerializer
        return QuoteSerializer(obj.parent_quote).data

    class Meta:
        model = Quote
        fields = [
            'id', 'user', 'text',
            'media', 'timestamp', 'is_quote', 'post', 'parent_quote',
        ]


class RepostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    post = PostSerializer(required=False, allow_null=True)
    quote = QuoteSerializer(required=False, allow_null=True)
    reply = ReplySerializer(required=False, allow_null=True)

    class Meta:
        model = Repost
        fields = ['id', 'user', 'post', 'reply', 'quote', 'timestamp', 'is_repost']


class LikeSerializer(serializers.ModelSerializer):
    likes = UserSerializer()
    post = PostSerializer(required=False, allow_null=True)
    quote = QuoteSerializer(required=False, allow_null=True)
    reply = ReplySerializer(required=False, allow_null=True)

    class Meta:
        model = Likes
        fields = [
                'id', 'likes', 'post','reply', 'quote', 'timestamp',
            ]



class ChatSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    recipient = UserSerializer()

    class Meta:
        model = Chat
        fields =[
            'id', 'text', 'media', 'read', 'timestamp', 'sender', 'recipient'
        ]



class ChatBoxSerializer(serializers.ModelSerializer):
    user1 = UserSerializer()
    user2 = UserSerializer()
    latest_chat = serializers.SerializerMethodField()

    class Meta:
        model = ChatBox
        fields = [
            'id', 'name', 'user1', 'user2', 'latest_chat' 
        ]

    def get_latest_chat(self, obj):
        latest_chat = obj.chats.all().order_by('-timestamp').first()
        if latest_chat:
            return ChatSerializer(latest_chat).data
        return None
