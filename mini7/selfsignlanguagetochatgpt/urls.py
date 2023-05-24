from django.urls import path
from . import views

app_name = 'selfsignlanguagetochatgpt'
urlpatterns = [
    path('', views.index, name='index'),
    path('signLanguage/', views.chat, name='signLanguage'),
]
