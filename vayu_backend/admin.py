from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin 

from .models import EmergencyIncident

# ye sari ilne admin board bana kar feti hai  aur unke details ko show kate hau
class customUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_staff')

#89
admin.site.unregister(User)
admin.site.register(User, customUserAdmin)


@admin.register(EmergencyIncident)
class EmergencyIncidentAdmin(admin.ModelAdmin):
    list_display = ("incident_id", "created_at", "status", "latitude", "longitude", "admin_email_status", "sms_status", "recording")
    list_filter = ("status", "admin_email_status", "sms_status", "created_at")
    search_fields = ("incident_id", "user_identifier", "emergency_contact_1", "emergency_contact_2")
    readonly_fields = ("created_at", "payload", "recording_size")


