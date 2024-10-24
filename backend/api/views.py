from django.shortcuts import render

# Create your views here.


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, FundSettings
from .serializers import FundSettingsSerializer
from twilio.rest import Client
from django.conf import settings
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
import stripe
from decimal import Decimal

# Initialize Twilio client
twilio_client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

class SendVerificationCodeView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        if phone_number:
            user, created = User.objects.get_or_create(phone_number=phone_number)
            # Send verification code via Twilio
            verification = twilio_client.verify.services(settings.TWILIO_SERVICE_SID).verifications.create(
                to=phone_number,
                channel='sms'
            )
            return Response({'message': 'Verification code sent.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Phone number is required.'}, status=status.HTTP_400_BAD_REQUEST)

class VerifyCodeView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        code = request.data.get('code')
        if phone_number and code:
            verification_check = twilio_client.verify.services(settings.TWILIO_SERVICE_SID).verification_checks.create(
                to=phone_number,
                code=code
            )
            if verification_check.status == 'approved':
                user = User.objects.get(phone_number=phone_number)
                user.is_verified = True
                user.save()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Phone number verified.',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user_id': user.id,
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid verification code.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Phone number and code are required.'}, status=status.HTTP_400_BAD_REQUEST)

class ProcessPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data.get('user_id')
        amount = request.data.get('amount')
        payment_method_id = request.data.get('payment_method_id')
        is_recurring = request.data.get('is_recurring')

        user = get_object_or_404(User, id=user_id)
        amount_cents = int(float(amount) * 100)  # Convert to cents

        try:
            if not user.stripe_customer_id:
                customer = stripe.Customer.create(
                    phone=user.phone_number,
                    payment_method=payment_method_id
                )
                user.stripe_customer_id = customer['id']
                user.save()

            if is_recurring:
                # Create subscription
                price = stripe.Price.create(
                    unit_amount=amount_cents,
                    currency='usd',
                    recurring={'interval': 'month'},
                    product_data={'name': 'Charity Autopayment'}
                )
                subscription = stripe.Subscription.create(
                    customer=user.stripe_customer_id,
                    items=[{'price': price.id}],
                    default_payment_method=payment_method_id,
                )
                user.autopay_enabled = True
                user.autopay_amount = Decimal(amount)
                user.payment_method_id = payment_method_id
                user.save()
            else:
                # One-time payment
                payment_intent = stripe.PaymentIntent.create(
                    amount=amount_cents,
                    currency='usd',
                    customer=user.stripe_customer_id,
                    payment_method=payment_method_id,
                    off_session=True,
                    confirm=True,
                )

            # Update total raised amount
            fund_settings, _ = FundSettings.objects.get_or_create(id=1)
            fund_settings.total_raised += Decimal(amount)
            fund_settings.save()

            return Response({'message': 'Payment processed successfully.'}, status=status.HTTP_200_OK)
        except stripe.error.StripeError as e:
            return Response({'error': 'Payment processing failed.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateFundInfoView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        info_text = request.data.get('info_text')
        fund_settings, _ = FundSettings.objects.get_or_create(id=1)
        fund_settings.info_text = info_text
        fund_settings.save()
        return Response({'message': 'Fund information updated.'}, status=status.HTTP_200_OK)

class UpdateFundSettingsView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = FundSettingsSerializer(data=request.data)
        if serializer.is_valid():
            fund_settings, _ = FundSettings.objects.get_or_create(id=1)
            fund_settings.fund_name = serializer.validated_data['fund_name']
            fund_settings.fund_goal = serializer.validated_data['fund_goal']
            fund_settings.show_progress_bar = serializer.validated_data['show_progress_bar']
            fund_settings.save()
            return Response({'message': 'Fund settings updated.'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetFundSettingsView(APIView):
    def get(self, request):
        fund_settings, _ = FundSettings.objects.get_or_create(id=1)
        serializer = FundSettingsSerializer(fund_settings)
        return Response(serializer.data, status=status.HTTP_200_OK)
