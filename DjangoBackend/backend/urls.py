"""
URL configuration for backend project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('auth.urls')),
    path('api/tournaments/', include('tournaments.urls')),
    path('api/teams/', include('teams.urls')),
    path('api/users/', include('users.urls')),
]
