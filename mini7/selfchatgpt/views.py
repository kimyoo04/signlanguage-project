from django.http import JsonResponse
from question.bard_gpt import chatGPT
import json


# chat, signLanguage 만들어야 함
def chat(request):
    """
    Bard 답변 세 개와 ChatGPT 답변 한 개를 리스트로 반환해주는 함수
    """
    import random
    body = json.loads(request.body)
    print('오오오오오오올ㅇ너롼ㅇ래쟐ㄴㄹ',request.body)
    question = body['question']
    answer = {"result": chatGPT(question)[0]} #['ekqqus']
    return JsonResponse(answer)

