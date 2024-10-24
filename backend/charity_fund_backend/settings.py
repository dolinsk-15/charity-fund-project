





"""
Настройки Django для проекта charity_fund_backend.

Сгенерировано с помощью 'django-admin startproject' используя Django 5.0.3.

Для получения дополнительной информации об этом файле, смотрите
https://docs.djangoproject.com/en/5.0/topics/settings/

Для полного списка настроек и их значений, смотрите
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os
from pathlib import Path
from dotenv import load_dotenv

import pymysql
pymysql.install_as_MySQLdb()


load_dotenv()  # Загрузка переменных окружения из файла .env

# Построение путей внутри проекта, например: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Быстрые настройки для разработки - не подходят для продакшена
# Смотрите https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# ВНИМАНИЕ: держите секретный ключ в секрете в продакшене!
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-default-secret-key')

# ВНИМАНИЕ: не запускайте с DEBUG=True в продакшене!
DEBUG = True

ALLOWED_HOSTS = ['*']  # Только для разработки; обновите для вашего домена в продакшене

# Определение приложений

INSTALLED_APPS = [
    # Приложения Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Сторонние приложения
    'rest_framework',
    'corsheaders',
    # Ваши приложения
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # CORS middleware вверху
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'charity_fund_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Вы можете добавить директории с шаблонами здесь
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

WSGI_APPLICATION = 'charity_fund_backend.wsgi.application'
ASGI_APPLICATION = 'charity_fund_backend.asgi.application'

# База данных
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('DB_NAME', 'charity_fund_db'),
        'USER': os.environ.get('DB_USER', 'your_mysql_user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'your_mysql_password'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': '3306',
    }
}

# Настройки аутентификации
AUTH_USER_MODEL = 'api.User'

# Настройки REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# Настройки CORS
CORS_ALLOW_ALL_ORIGINS = True  # Только для разработки

# Статические и медиа файлы
STATIC_URL = '/static/'

# Настройки Twilio и Stripe
TWILIO_ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN')
TWILIO_SERVICE_SID = os.environ.get('TWILIO_SERVICE_SID')

STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')

# Валидация паролей
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# Интернационализация
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Тип поля первичного ключа по умолчанию
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
