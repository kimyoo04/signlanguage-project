from django.shortcuts import render
from django.utils import timezone
from django.http import JsonResponse

import numpy as np
import cv2
import string
import mlflow
import mlflow.keras

from .models import ChatResult, Result
from question.bard_gpt import GPT_BARD_answer


def chat(request):
    """
    수어 사진을 입력 받으면 Bard 답변 세 개와 ChatGPT 답변 한 개를 리스트로 반환해주는 함수
    """

    if request.method == 'POST' and 'files' in request.FILES:
        results=[]
        files = request.FILES.getlist('files')
        chatGptPrompt = ""
        for idx,file in enumerate(files, start=0):
            class_names = list(string.ascii_lowercase)
            class_names = np.array(class_names)

            # mlflow 로딩
            mlflow_uri="http://mini7-mlflow.carpediem.so/"
            mlflow.set_tracking_uri(mlflow_uri)
            model_uri = "models:/Sign_Signal/04"
            model = mlflow.keras.load_model(model_uri)

            # history 저장을 위해 객체에 담아서 DB에 저장한다.
            # 이때 파일시스템에 저장도 된다.
            result = Result()
            result.image = file
            result.pub_date = timezone.datetime.now()
            result.save()


            # 흑백으로 읽기
            img = cv2.imread(result.image.path, cv2.IMREAD_GRAYSCALE)

            # 크기 조정
            img = cv2.resize(img, (28, 28))

            # input shape 맞추기
            test_sign = img.reshape(1, 28, 28, 1)

            # 스케일링
            test_sign = test_sign / 255.

            # 예측 : 결국 이 결과를 얻기 위해 모든 것을 했다.
            pred = model.predict(test_sign)
            pred_1 = pred.argmax(axis=1)

            result_str = class_names[pred_1][0]


            #결과를 DB에 저장한다.
            result.result = result_str
            # result.is_correct =
            result.save()
            results.append(result)

            #result.result의 결과를 하나씩 chatGptPrompt에 추가한다.
            chatGptPrompt += result.result

        #질문을 DB에 저장한다.
        chatResult = ChatResult()
        chatResult.prompt = chatGptPrompt
        chatResult.pub_date = timezone.datetime.now()
        chatResult.save()


        #저장된 질문을 DB에서 가져온다.
        selectedChatResult = ChatResult.objects.get(id=chatResult.id)

        #chatGptPrompt를 chatGPT에게 전달한다.
        content = GPT_BARD_answer(selectedChatResult.prompt)
        selectedChatResult.content = content
        selectedChatResult.save()

        context = {
            'result': selectedChatResult.content
        }

        print(f'응답 : {context}')

        return JsonResponse(context)
    return JsonResponse({"message":"fail"}, status=400)