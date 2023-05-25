from django.urls import path
from . import views

app_name = 'selfchatgpt'

urlpatterns = [
    path('', views.chat, name='chat'),
]