# api/models.py
from django.db import models
from django.contrib.auth.models import User

# ----------------------------
# Task Model — represents each task created by a user.
# ----------------------------
class Task(models.Model):
    """
    The sample entity for CRUD operations.
    """
    # Foreign key link: ensures only authenticated users can own a task
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
