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

    def validate_birthdate(self, value):
        if value and value > timezone.now().date():
            raise serializers.ValidationError(
                "Birthdate cannot be in the future.")
        return value


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
    post = PostSerializer(required=False, allow_null=True, source='post')
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
    post = PostSerializer(required=False, allow_null=True, source='post')
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
    post = PostSerializer(required=False, allow_null=True, source='post')
    quote = QuoteSerializer(required=False, allow_null=True, source='quote')
    reply = ReplySerializer(required=False, allow_null=True, source='reply')

    class Meta:
        model = Repost
        fields = ['id', 'user', 'post', 'reply', 'quote', 'timestamp', 'is_repost']


class LikeSerializers(serializers.ModelSerializer):
    likes = UserSerializer()
    post = PostSerializer(required=False, allow_null=True, source='post')
    quote = QuoteSerializer(required=False, allow_null=True, source='quote')
    reply = ReplySerializer(required=False, allow_null=True, source='reply')

    class Meta:
        model = Likes
        fields = [
                'id', 'likes', 'post','reply', 'quote', 'timestamp',
            ]