"""Django settings for backend project."""

from pathlib import Path
from datetime import timedelta  # NEW: Required for SIMPLE_JWT configuration

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
SECRET_KEY = 'django-insecure-#z^)#!=f#8--8rw32=jadrb(e4ynq%i70oh$jglg^a&5h+f!7l'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    # Custom Apps (must be registered first)
    'api.apps.ApiConfig',

    # Third-Party Apps (for API, CORS, and JWT)
    'rest_framework',        # NEW: For building APIs
    'corsheaders',           # NEW: For frontend communication
    'rest_framework_simplejwt',  # NEW: For JWT authentication

    # Django defaults
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    # NEW: MUST be near the top for CORS
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database - UPDATED FOR MYSQL
# YOU MUST UPDATE THESE VALUES!
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # Changed from sqlite3
        'NAME': 'frontendtask_db',           # Your database name
        'USER': 'root',            # Your MySQL username
        'PASSWORD': 'Aswin@2003',    # Your MySQL password
        'HOST': '127.0.0.1',                  # IP address of MySQL server
        'PORT': '3306',                       # MySQL port
    }
}


# Password validation (uses default Django hashing - meets requirements)
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# --- NEW API/CORS/JWT CONFIGURATION ---

# CORS Configuration (Allows frontend access)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",  # Your Next.js frontend running locally
    # Add your deployed frontend URL here later
]

# Django REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',  # Default to protected
    )
}

# Simple JWT Configuration (Manages token lifespan and security)
SIMPLE_JWT = {
    # Short token lifespan is good security
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'AUTH_HEADER_TYPES': ('Bearer',),  # Standard header format
}
