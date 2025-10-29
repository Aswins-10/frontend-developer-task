# core/urls.py

from django.contrib import admin
from django.urls import path, include  # CRITICAL: You must import 'include'
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # 1. JWT Authentication Endpoints (for login and refreshing tokens)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # 2. API Routes (Includes 'register/' and 'tasks/')
    # This line tells Django: "If the URL starts with 'api/', look inside api.urls"
    path('api/', include('api.urls')),
]
