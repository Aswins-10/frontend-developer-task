# api/views.py
from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer, TaskSerializer
from .models import Task

# --- 1. User Registration View ---


class RegisterView(generics.CreateAPIView):
    """ Handles User Registration (Signup). """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]  # Publicly accessible

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "User registered successfully. You can now login."},
            status=status.HTTP_201_CREATED
        )

# --- 2. Task CRUD ViewSet ---


class TaskViewSet(viewsets.ModelViewSet):
    """ Handles all CRUD operations on the Task entity. """
    serializer_class = TaskSerializer
    # REQUIREMENT: Protected route (JWT authentication middleware applied)
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """ Filters tasks to show ONLY the tasks owned by the logged-in user (security). """
        return Task.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        """ Automatically sets the task's user to the authenticated user. """
        serializer.save(user=self.request.user)
