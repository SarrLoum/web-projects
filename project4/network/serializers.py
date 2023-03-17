from rest_framework import serializers

from .models import *


class UserSerializer(serializers.ModelSerializer):
    following = serializers.StringRelatedField(many=True)
    followers = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'birthdate', 'password']

    def validate_birthdate(self, value):
        if value and value > timezone.now().date():
            raise serializers.ValidationError("Birthdate cannot be in the future.")
        return value


class FollowSerializer(serializers.ModelSerializer):

    class Meta:
        model: Follow
        fields = ['follower', 'following']


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['id', 'user', 'avatar', 'imgcover', 'pseudo_name', 'bio', 'location', 'website']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'text', 'media', 'timestamp']


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'user', 'post', 'text', 'media', 'timestamp']


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ['id', 'user', 'post', 'text', 'media', 'timestamp']


class RepostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repost
        fields = ['id', 'post', 'user', 'timestamp']


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
