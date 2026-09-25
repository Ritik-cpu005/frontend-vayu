import json
import random
import uuid
from datetime import timedelta
from functools import wraps

from django.conf import settings
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone

from .models import EmergencyIncident, UserProfile


class InvalidJsonPayload(ValueError):
	pass


def json_error_response(view):
	@wraps(view)
	def wrapped(request, *args, **kwargs):
		try:
			return view(request, *args, **kwargs)
		except InvalidJsonPayload as error:
			return JsonResponse({"error": str(error)}, status=400)
	return wrapped


def _user_payload(user):
	profile, _ = UserProfile.objects.get_or_create(user=user)
	return {
		"id": user.id,
		"username": user.username,
		"email": user.email,
		"first_name": profile.first_name,
		"middle_name": profile.middle_name,
		"last_name": profile.last_name,
		"phone": profile.phone,
		"age": profile.age,
		"gender": profile.gender,
		"country": profile.country,
		"emergency_one": profile.emergency_one,
		"emergency_two": profile.emergency_two,
	}


@csrf_exempt
@json_error_response
@require_http_methods(["POST"])
def register_user(request):
	data = _incident_payload(request)
	username = data.get("username", "").strip()
	email = data.get("email", "").strip().lower()
	password = data.get("password", "")
	if not username or not email or not password:
		return JsonResponse({"error": "Username, email, and password are required."}, status=400)
	if User.objects.filter(username=username).exists():
		return JsonResponse({"error": "That username is already in use."}, status=409)
	if User.objects.filter(email__iexact=email).exists():
		return JsonResponse({"error": "That email is already in use."}, status=409)
	user = User.objects.create_user(username=username, email=email, password=password,
		first_name=data.get("full_name", "").strip())
	UserProfile.objects.create(user=user)
	return JsonResponse({"user": _user_payload(user)}, status=201)


@csrf_exempt
@json_error_response
@require_http_methods(["POST"])
def login_user(request):
	data = _incident_payload(request)
	user = authenticate(username=data.get("username", "").strip(), password=data.get("password", ""))
	if user is None:
		return JsonResponse({"error": "Invalid username or password."}, status=401)
	login(request, user)
	return JsonResponse({"user": _user_payload(user)})


@csrf_exempt
@json_error_response
@require_http_methods(["GET", "PUT"])
def user_profile(request):
	if not request.user.is_authenticated:
		return JsonResponse({"error": "Please log in first."}, status=401)
	if request.method == "GET":
		return JsonResponse({"user": _user_payload(request.user)})
	data = _incident_payload(request)
	profile, _ = UserProfile.objects.get_or_create(user=request.user)
	request.user.email = data.get("email", request.user.email).strip().lower()
	request.user.save(update_fields=["email"])
	for field in ("first_name", "middle_name", "last_name", "phone", "gender", "country", "emergency_one", "emergency_two"):
		if field in data:
			setattr(profile, field, str(data[field]).strip())
	if "age" in data:
		try:
			profile.age = int(data["age"]) if data["age"] else None
		except (TypeError, ValueError):
			return JsonResponse({"error": "Age must be a number."}, status=400)
	profile.save()
	return JsonResponse({"user": _user_payload(request.user)})


@csrf_exempt
@json_error_response
@require_http_methods(["POST"])
def request_password_reset(request):
	data = _incident_payload(request)
	email = data.get("email", "").strip().lower()
	user = User.objects.filter(email__iexact=email).first()
	if user:
		profile, _ = UserProfile.objects.get_or_create(user=user)
		profile.reset_code = f"{random.SystemRandom().randint(0, 999999):06d}"
		profile.reset_code_expires = timezone.now() + timedelta(minutes=10)
		profile.save(update_fields=["reset_code", "reset_code_expires"])
		send_mail("Vayu Brahman password confirmation", f"Your confirmation code is {profile.reset_code}. It expires in 10 minutes.", settings.DEFAULT_FROM_EMAIL, [user.email])
	return JsonResponse({"message": "If an account uses that email, a confirmation code has been sent."})


@csrf_exempt
@json_error_response
@require_http_methods(["POST"])
def confirm_password_reset(request):
	data = _incident_payload(request)
	user = User.objects.filter(email__iexact=data.get("email", "").strip()).first()
	profile = getattr(user, "profile", None) if user else None
	if not profile or profile.reset_code != data.get("code", "") or not profile.reset_code_expires or profile.reset_code_expires < timezone.now():
		return JsonResponse({"error": "The email confirmation code is invalid or expired."}, status=400)
	password = data.get("password", "")
	if len(password) < 8:
		return JsonResponse({"error": "Password must be at least 8 characters."}, status=400)
	user.set_password(password)
	user.save(update_fields=["password"])
	profile.reset_code = ""
	profile.reset_code_expires = None
	profile.save(update_fields=["reset_code", "reset_code_expires"])
	return JsonResponse({"message": "Password updated. You can now log in."})


@csrf_exempt
@json_error_response
@require_http_methods(["POST"])
def customer_care(request):
	data = _incident_payload(request)
	name = data.get("name", "").strip()
	email = data.get("email", "").strip()
	message = data.get("message", "").strip()
	if not name or not email or not message:
		return JsonResponse({"error": "Name, email, and message are required."}, status=400)
	send_mail(
		subject=f"VAYU customer care request from {name}",
		message=f"Customer: {name}\nReply email: {email}\nUser ID: {data.get('user_id') or 'Not provided'}\n\n{message}",
		from_email=settings.DEFAULT_FROM_EMAIL,
		recipient_list=[settings.VAYU_ADMIN_EMAIL],
		fail_silently=False,
	)
	return JsonResponse({"message": "Your message was sent to Vayu Brahman customer care."}, status=201)


def _incident_payload(request):
	if request.content_type and request.content_type.startswith("application/json"):
		try:
			payload = json.loads(request.body or "{}")
		except json.JSONDecodeError as error:
			raise InvalidJsonPayload("Request body must contain valid JSON.") from error
		if not isinstance(payload, dict):
			raise InvalidJsonPayload("JSON request body must be an object.")
		return payload
	return request.POST.dict()


@csrf_exempt
@json_error_response
@require_http_methods(["POST"])
def create_emergency_incident(request):
	data = _incident_payload(request)
	incident_id = data.get("incident_id") or f"VB-SOS-{uuid.uuid4().hex[:8].upper()}"
	location = data.get("location") or {}
	contacts = data.get("emergency_contacts") or {}
	if not isinstance(location, dict) or not isinstance(contacts, dict):
		return JsonResponse({"error": "Location and emergency contacts must be JSON objects."}, status=400)
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
