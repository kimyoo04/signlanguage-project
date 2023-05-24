from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title", "content", "create_date", "views", "user_id"]

        labels = {
            'title': '제목',
            'content': '내용',
            'create_date': '작성일자',
            'views': '조회수',
            'user_id': '작성자'
        }