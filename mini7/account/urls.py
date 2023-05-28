from django.urls import path
from . import views
from .views import signin_view, signout_view

urlpatterns = [
    path('/signup', views.signup, name='signup'),
    path('/signin', signin_view, name='signin'),
    path('/signout', signout_view, name='signout'),
]
