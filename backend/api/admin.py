from django.contrib import admin
from .models import User, FundSettings, Payment

# Register your models here.

admin.site.register(User)
admin.site.register(FundSettings)
admin.site.register(Payment)
