from django.http import JsonResponse


class LocalFrontendCorsMiddleware:
    """Allow the local static frontend to call the local Django API."""

    allowed_origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:5501",
        "http://localhost:5501",
    }

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        origin = request.headers.get("Origin")
        if request.method == "OPTIONS" and origin in self.allowed_origins:
            response = JsonResponse({}, status=204)
        else:
            response = self.get_response(request)
        if origin in self.allowed_origins:
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"
            response["Access-Control-Allow-Headers"] = "Content-Type"
            response["Access-Control-Allow-Methods"] = "GET, PUT, POST, OPTIONS"
        return response
