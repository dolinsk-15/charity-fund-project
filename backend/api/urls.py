from django.urls import path, include
from .views import (
    SendVerificationCodeView,
    VerifyCodeView,
    ProcessPaymentView,
    UpdateFundInfoView,
    UpdateFundSettingsView,
    GetFundSettingsView,
)

urlpatterns = [
    path('auth/send-code/', SendVerificationCodeView.as_view()),
    path('auth/verify-code/', VerifyCodeView.as_view()),
    path('payments/process/', ProcessPaymentView.as_view()),
    path('admin/update-info/', UpdateFundInfoView.as_view()),
    path('admin/update-settings/', UpdateFundSettingsView.as_view()),
    path('admin/fund-settings/', GetFundSettingsView.as_view()),
]
