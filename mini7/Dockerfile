FROM python:3.10.11

COPY ./ /django
WORKDIR /django

EXPOSE 8000

# oeenCV 설치시 필요한 패키지 설치
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

# 필요한 파이썬 패키지 설치
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt