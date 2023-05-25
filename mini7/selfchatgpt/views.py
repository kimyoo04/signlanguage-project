from django.http import JsonResponse
from question.bard_gpt import GPT_BARD_answer
import json


# chat, signLanguage 만들어야 함
def chat(request):
    """
    Bard 답변 세 개와 ChatGPT 답변 한 개를 리스트로 반환해주는 함수
    """
    import random
    body = json.loads(request.body)
    question = body['question']
    answer = {"result": ''.join(random.choice(GPT_BARD_answer(question)))}
    return JsonResponse(answer)

