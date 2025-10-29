# api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

# --- USER REGISTRATION ---


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']  # ✅ removed email

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user


# --- TASK SERIALIZER ---
class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Task
        fields = ['id', 'user', 'title', 'description',
                  'is_completed', 'created_at']
        read_only_fields = ('user',)
