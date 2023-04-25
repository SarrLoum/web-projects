from rest_framework import serializers

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

    class Meta:
        model = Reply
        fields = [
            'id', 'user', 'post', 'text',
            'media', 'timestamp', 'is_reply'
        ]


class QuoteSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Quote
        fields = [
            'id', 'user', 'post', 'text',
            'media', 'timestamp', 'is_quote'
        ]


class RepostSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Repost
        fields = ['id', 'post', 'user', 'timestamp', 'is_repost']


class PostMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMetric
        fields = ['id', 'post', 'likes', 'views', 'shares', 'impressions']


class ReplyMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplyMetric
        fields = ['id', 'reply', 'likes', 'views', 'shares', 'impressions']


class QuoteMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteMetric
        fields = ['id', 'quote', 'likes', 'views', 'shares', 'impressions']
