from bardapi import Bard
import os

# Bard에게 채팅 요청 API
def googleBard(prompt):
    '''
    prompt: HTML TextField에서의 입력(input)
    response: Bard API를 호출하고, prompt의 결과값 리턴
    '''
    # token은 구글 바드에다가 아무거나 검색 → 개발자 도구 → Application → __Secure-1PSID의 value 복사
    
    token = os.environ.get('AI_BARD_SECRET_KEY')

    answer = Bard(token=token).get_answer(prompt)['content']
    
    return [answer]




# -----------------------------------------------
# 1. 유저가 질문 입력 
# 2. POST 요청 ({question: "너이름이 뭐니?"}) 
# 3. 서버가 질분데이터 받기 (request.question)
# 4. googleBard함수 호출 (request.question 인자 받기) 
# 5. 함수 실행 및 리턴 
# 6. 프론트로 json 리턴
# -----------------------------------------------
