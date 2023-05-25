from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, timedelta
import json

from rest_framework_jwt.settings import api_settings


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
        
        if user is None:
            return JsonResponse({"message": "Fail"})
        else:
            print(f"생성 완료! id: {user_id} password: {password}")
            return JsonResponse({"message": "Success"})
        
def signin_view(request):
    if request.method == 'POST':
        raw_data = request.body.decode('utf-8')
        
        # JSON 디코딩
        json_data = json.loads(raw_data)
        
        userId = json_data.get('userId')
        password = json_data.get('password')
        print(userId, password)
        
        user = authenticate(request, username=userId, password=password)
        print(user)
        if user is not None:
            login(request, user)
            
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
            
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            
            response_data = {
                'success': True,
                'message': '로그인 성공!',
                'user': user.username,
            }
            response = JsonResponse(response_data)
            response.set_cookie('jwt_token', token, expires=datetime.utcnow() + timedelta(hours=24))
            
            return response
        else:
            return JsonResponse({'success': False, 'message': '잘못된 사용자 이름 또는 비밀번호입니다.'})

    return render(request, 'signin.html')

def signout_view(request):
    logout(request)
    return JsonResponse({'success': True, 'message': '로그아웃 되었습니다.'})
        
