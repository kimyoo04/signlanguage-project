from django.http import JsonResponse
from django.shortcuts import render
import openai
import os

openai.api_key = os.environ.get("AI_CHATGPT_SECRET_KEY")


#chatGPT에게 채팅 요청 API
def chatGPT(prompt):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    print(completion)
    result = completion.choices[0].message.content
    return result

#chatGPT에게 그림 요청 API
def imageGPT(prompt):
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="256x256"
    )
    result =response['data'][0]['url']
    return result

def index(request):
    return render(request, 'selfgpt/index.html')

def chat(request):
    prompt = request.POST.get('question')
    result = chatGPT(prompt)
    context = {
        'result': result
    }

    return JsonResponse(context)