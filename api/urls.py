# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, TaskViewSet

# Router handles the Task CRUD routes automatically (list, create, detail, update, delete)
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    # User Registration (Signup API)
    path('register/', RegisterView.as_view(), name='register'),

    # Task CRUD routes
    path('', include(router.urls)),
]
