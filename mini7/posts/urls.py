from django.urls import path 
from . import views

app_name = 'posts'

urlpatterns = [
    path('', views.posts_id_none), 
    path('<int:post_id>/', views.posts_id_not_none),
]

