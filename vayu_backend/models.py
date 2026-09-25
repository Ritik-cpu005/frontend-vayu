from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
	first_name = models.CharField(max_length=100, blank=True)
	middle_name = models.CharField(max_length=100, blank=True)
	last_name = models.CharField(max_length=100, blank=True)
	phone = models.CharField(max_length=30, blank=True)
	age = models.PositiveSmallIntegerField(null=True, blank=True)
	gender = models.CharField(max_length=30, blank=True)
	country = models.CharField(max_length=100, blank=True)
	emergency_one = models.CharField(max_length=255, blank=True)
	emergency_two = models.CharField(max_length=255, blank=True)
	reset_code = models.CharField(max_length=6, blank=True)
	reset_code_expires = models.DateTimeField(null=True, blank=True)

	def __str__(self):
		return f"Profile for {self.user.username} (user id {self.user_id})"


class EmergencyIncident(models.Model):
	STATUS_CHOICES = [
		("active", "Active"),
		("resolved", "Resolved"),
	]

	incident_id = models.CharField(max_length=32, unique=True)
	created_at = models.DateTimeField(auto_now_add=True)
	status = models.CharField(max_length=16, choices=STATUS_CHOICES, default="active")
	user_identifier = models.CharField(max_length=150, blank=True)
	latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
	longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
	location_accuracy = models.FloatField(null=True, blank=True)
	emergency_contact_1 = models.CharField(max_length=255, blank=True)
	emergency_contact_2 = models.CharField(max_length=255, blank=True)
	admin_email = models.EmailField(blank=True)
	admin_phone = models.CharField(max_length=20, blank=True)
	admin_email_status = models.CharField(max_length=32, default="queued")
	contact_alert_status = models.CharField(max_length=32, default="queued")
	sms_status = models.CharField(max_length=32, default="provider_not_configured")
	call_requested = models.BooleanField(default=False)
	camera_enabled = models.BooleanField(default=False)
	microphone_enabled = models.BooleanField(default=False)
	recording = models.FileField(upload_to="emergency_recordings/", null=True, blank=True)
	recording_size = models.PositiveBigIntegerField(null=True, blank=True)
	payload = models.JSONField(default=dict, blank=True)

	class Meta:
		ordering = ["-created_at"]

	def __str__(self):
		return f"{self.incident_id} · {self.status}"
