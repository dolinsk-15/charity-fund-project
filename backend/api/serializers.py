from rest_framework import serializers
from .models import FundSettings

class FundSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundSettings
        fields = ['fund_name', 'fund_goal', 'show_progress_bar', 'total_raised', 'info_text']
