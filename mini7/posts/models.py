from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=500)
    create_date = models.DateTimeField()
    views = models.IntegerField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

