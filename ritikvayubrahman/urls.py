"""
URL configuration for ritikvayubrahman project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from vayu_backend.views import create_emergency_incident, upload_incident_recording

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/emergency/incidents/', create_emergency_incident, name='create-emergency-incident'),
    path('api/emergency/incidents/<str:incident_id>/recording/', upload_incident_recording, name='upload-incident-recording'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
