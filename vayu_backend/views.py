import json
import uuid

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import EmergencyIncident


def _incident_payload(request):
	if request.content_type and request.content_type.startswith("application/json"):
		try:
			return json.loads(request.body or "{}")
		except json.JSONDecodeError:
			return {}
	return request.POST.dict()


@csrf_exempt
@require_http_methods(["POST"])
def create_emergency_incident(request):
	data = _incident_payload(request)
	incident_id = data.get("incident_id") or f"VB-SOS-{uuid.uuid4().hex[:8].upper()}"
	location = data.get("location") or {}
	contacts = data.get("emergency_contacts") or {}
	incident = EmergencyIncident.objects.create(
		incident_id=incident_id,
		user_identifier=data.get("user_identifier", ""),
		latitude=location.get("latitude"),
		longitude=location.get("longitude"),
		location_accuracy=location.get("accuracy"),
		emergency_contact_1=contacts.get("one", ""),
		emergency_contact_2=contacts.get("two", ""),
		admin_email=settings.VAYU_ADMIN_EMAIL,
		admin_phone=settings.VAYU_ADMIN_PHONE,
		camera_enabled=bool(data.get("camera_enabled")),
		microphone_enabled=bool(data.get("microphone_enabled")),
		payload=data,
	)
	location_link = "Location unavailable"
	if incident.latitude is not None and incident.longitude is not None:
		location_link = f"https://maps.google.com/?q={incident.latitude},{incident.longitude}"
	email_status = "sent"
	try:
		send_mail(
			subject=f"VAYU SOS ALERT · {incident.incident_id}",
			message=(f"Emergency incident {incident.incident_id} was created.\n\n"
					  f"User: {incident.user_identifier or 'Unknown'}\n"
					  f"Location: {location_link}\n"
					  f"Emergency contacts: {incident.emergency_contact_1}, {incident.emergency_contact_2}\n"
					  f"Call emergency services: 112\n"),
			from_email=settings.DEFAULT_FROM_EMAIL,
			recipient_list=[settings.VAYU_ADMIN_EMAIL],
			fail_silently=False,
		)
	except Exception:
		email_status = "failed"
	incident.admin_email_status = email_status
	incident.save(update_fields=["admin_email_status"])
	return JsonResponse({
		"incident_id": incident.incident_id,
		"admin_email_status": incident.admin_email_status,
		"sms_status": incident.sms_status,
		"admin_phone": settings.VAYU_ADMIN_PHONE,
		"emergency_call": "112",
		"location_link": location_link,
	}, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def upload_incident_recording(request, incident_id):
	try:
		incident = EmergencyIncident.objects.get(incident_id=incident_id)
	except EmergencyIncident.DoesNotExist:
		return JsonResponse({"error": "Incident not found."}, status=404)
	recording = request.FILES.get("recording")
	if not recording:
		return JsonResponse({"error": "No recording uploaded."}, status=400)
	incident.recording = recording
	incident.recording_size = recording.size
	incident.camera_enabled = request.POST.get("camera_enabled") == "true"
	incident.microphone_enabled = request.POST.get("microphone_enabled") == "true"
	incident.save(update_fields=["recording", "recording_size", "camera_enabled", "microphone_enabled"])
	return JsonResponse({"incident_id": incident.incident_id, "recording_saved": True})
