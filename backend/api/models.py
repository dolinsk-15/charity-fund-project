




from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from decimal import Decimal

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError('The Phone Number is required')
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)  # Используйте для создания пароля
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        # Устанавливаем значения по умолчанию для суперпользователя
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(phone_number, password, **extra_fields)

class User(AbstractBaseUser):
    phone_number = models.CharField(max_length=15, unique=True)
    is_verified = models.BooleanField(default=False)
    stripe_customer_id = models.CharField(max_length=255, null=True, blank=True)
    autopay_enabled = models.BooleanField(default=False)
    autopay_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    payment_method_id = models.CharField(max_length=255, null=True, blank=True)
    is_staff = models.BooleanField(default=False)  # Нужно для доступа к админке
    is_superuser = models.BooleanField(default=False)  # Нужно для суперпользователя

    USERNAME_FIELD = 'phone_number'

    objects = UserManager()

    def __str__(self):
        return self.phone_number

class FundSettings(models.Model):
    info_text = models.TextField(null=True, blank=True)
    fund_name = models.CharField(max_length=255)
    fund_goal = models.DecimalField(max_digits=10, decimal_places=2)
    show_progress_bar = models.BooleanField(default=True)
    total_raised = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.fund_name

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method_id = models.CharField(max_length=255)
    is_recurring = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} by {self.user.phone_number}"
