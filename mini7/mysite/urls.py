from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render

from rest_framework import routers, permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="KT Django API v1.0", default_version='v1',
        contact=openapi.Contact(email="blackdew7@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # API 문서
    path('api/schema',
         schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/swagger', schema_view.with_ui('swagger',
                                            cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc',
                                           cache_timeout=0), name='schema-redoc'),

    # API URL
    path('api/', include([
        path('chat', include('selfchatgpt.urls')),
        path('signLanguage/', include('selfsignlanguagetochatgpt.urls')),
        path('posts/', include('posts.urls')),
        path('account/', include('account.urls')),
    ]))
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
