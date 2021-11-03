from pathlib import Path
import environ
import copy
import datetime

from datetime import timedelta

# Initialise environment variables
env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')
CULQI_PUBLIC = env('CULQI_PUBLIC')
CULQI_PRIVATE = env('CULQI_PRIVATE')

DOLLAR_CHANGE = 4.10
date = '2021-11-23 23:59:59'
AGROMIN_START_DATE = datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S") # fecha de comienzo de agromin
END_POINT_EMAIL = "https://api.emailjs.com/api/v1.0/email/send"


EXHIBITORS = ["Exhibidor","Colaborador Jr","Colaborador","Auspiciador","Patrocinador", "Periodista"]


GENERIC_CREDENTIALS_EMAIL = {
            "user_id": env('EMAILJS_USER_ID'),
            "service_id": env('EMAILJS_SERVICE'),
            "template_id": "",
            "accessToken": env('EMAILJS_ACCESS_TOKEN'),
            "template_params": {
                    "nombre": "",
                    "enlace": env('FAIR_URL'),
                    "email": "",
                    "contrasenia": "",
            }
        }

SPANISH_CREDENTIALS_EMAIL = copy.deepcopy(GENERIC_CREDENTIALS_EMAIL)
SPANISH_CREDENTIALS_EMAIL["template_id"] = env('EMAILJS_TEMPLATE_CREDENTIALS_SPANISH')

ENGLISH_CREDENTIALS_EMAIL = copy.deepcopy(GENERIC_CREDENTIALS_EMAIL)
ENGLISH_CREDENTIALS_EMAIL["template_id"] = env('EMAILJS_TEMPLATE_CREDENTIALS_ENGLISH')

SPANISH_RESTORE_EMAIL = copy.deepcopy(GENERIC_CREDENTIALS_EMAIL)
SPANISH_RESTORE_EMAIL["template_id"] = env('EMAILJS_TEMPLATE_RESTOREPASSWORD_SPANISH')

ENGLISH_RESTORE_EMAIL = copy.deepcopy(GENERIC_CREDENTIALS_EMAIL)
ENGLISH_RESTORE_EMAIL["template_id"] = env('EMAILJS_TEMPLATE_RESTOREPASSWORD_ENGLISH')


URL_PREFIX = 'api'
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    #'rest_framework.authtoken',
    'channels',
    'profile_api',
    'corsheaders',
    'storages',
    'rest_framework_simplejwt',
    'humanResources',
    'core',
    'fair3D',
    'chat',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',    
    'django.contrib.sessions.middleware.SessionMiddleware',    
    'django.middleware.common.CommonMiddleware',    
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'agromin.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'agromin.wsgi.application'



...

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),#(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=2),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': datetime.timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': datetime.timedelta(days=1),
}



# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/


LANGUAGE_CODE = 'es'

TIME_ZONE = 'America/Bogota'

USE_I18N = True

USE_L10N = True

USE_TZ = True



REST_FRAMEWORK = {
  
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
    
}


# Azure

DEFAULT_FILE_STORAGE = 'agromin.custom_azure.AzureMediaStorage'
AZURE_ACCOUNT_KEY = env("AZURE_ACCOUNT_KEY")
AZURE_ACCOUNT_NAME = env("AZURE_ACCOUNT_NAME")
MEDIA_CONTAINER = env("MEDIA_CONTAINER")
AZURE_CUSTOM_DOMAIN = f'{AZURE_ACCOUNT_NAME}.blob.core.windows.net'
MEDIA_URL = f'https://{AZURE_CUSTOM_DOMAIN}/{MEDIA_CONTAINER}/'

STATIC_URL = '/static/'

AUTH_USER_MODEL = 'profile_api.UserProfile'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

ASGI_APPLICATION = "agromin.routing.application"