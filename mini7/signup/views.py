from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse, Http404
import json

def check_duplicate_username(username):
    try:
        # User 모델에서 해당 아이디로 사용자 조회
        User.objects.get(username=username)
        return True  # 중복된 아이디가 존재함
    except User.DoesNotExist:
        return False  # 중복된 아이디가 존재하지 않음

def create_user_with_duplicate_check(user_id, password, user_name):
    try:
        # 중복되지 않은 아이디인 경우, 유저 생성
        user = User.objects.create_user(username=user_id, password=password)
        user.first_name = user_name
        user.save()
        return user
    except:
        # 중복된 아이디인 경우, 예외 처리 또는 오류 메시지 반환 등을 수행
        return None

def signup(request):
    if request.method == 'POST':
        # 프론트엔드에서 전달된 데이터
        
        raw_data = request.body.decode('utf-8')

        # JSON 디코딩
        json_data = json.loads(raw_data)

        # "userId" 값 추출
        user_id = json_data.get('userId')
        password = json_data.get('password')
        user_name = json_data.get('username')
        
        
        user = create_user_with_duplicate_check(user_id, password, user_name)
        
        if user == None:
            return JsonResponse({"message": "Fail"})
        else:
            print(f"생성 완료! id: {user_id} password: {password}")
            return JsonResponse({"message": "Success"})
        