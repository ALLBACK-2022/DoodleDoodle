# DoodleDoodle

# DoodleDoodle: 사용자의 그림을 AI가 맞추고 분석해주는 서비스

본 서비스는 사용자가 그린 그림을 AI 모델을 통해 무엇을 그렸는지 유추하고, 그 결과를 퍼센트로 변환하여 사용자가 그린 그림이 제시어와 얼마나 유사한지 알려주는 서비스 입니다. 

![ezgif.com-gif-maker (7).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a762790-3fe5-435f-ad09-20b32b91b685/ezgif.com-gif-maker_(7).gif)

## System Architecture

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dd29e2ab-ae21-4049-97dc-4c24be383807/Untitled.png)

www.drawingdoodle.com

## Features

- Main Feature: 사용자가 그린 그림이 서비스에서 제시한 단어와 얼마나 유사한지 AI가 분석한 결과를 제공
- Additional Feature: 사용자가 그린 그림을 보고 AI가 추측한 결과 + 카카오톡을 통해 결과 및 사진 공유

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/136eca97-9883-4a8d-b04d-2a7fd6f9ad85/Untitled.png)

**Main**

서비스에 참여하는 인원수를 설정한 후, start 버튼을 눌러 시작합니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3f98a080-098e-4406-b245-e51838c331bc/Untitled.png)

**Choose a word to draw**

랜덤으로 생성되는 단어 중에 그리고 싶은 단어를 고릅니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9bd878d4-ff70-4f7f-80dd-2e1419853b8b/Untitled.png)

**The results of one doodle**

AI가 선택했던 단어와 얼마나 유사하다고 예측했는지, 그리고 이 그림을 보고 유사하다고 생각한 상위5개 결과를 유저의 그림과 함께 보여줍니다.

**Kakao Talk sharing**

자랑하기(PC), 공유 아이콘(모바일)을 누르면 이렇게 AI가 분석한 결과와 함께, 그렸던 그림을 공유할 수 있습니다!

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/657fafa0-da32-4dc3-a923-c948c44c920b/Untitled.png)

**Information**

이 프로젝트와 팀원 깃허브링크, 참고한 웹사이트 링크,  서비스 참여 방법을 제공합니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/774e9885-6205-4792-91ca-8e8e380465cd/Untitled.png)

**Draw the word on canvas**

앞서 선택했던 단어에 맞게 그림을 그립니다

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2319cf86-0c3e-4311-a3e9-d535da523b81/Untitled.png)

**The results of several doodles**

참여한 유저들의 그림과 함께 선택했던 단어의 유사도를 기준으로 순위를 매겨 보여줍니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff1fd0ec-bba9-4d9d-bfa6-a04f5a045b34/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/945290e4-05f1-4897-a0fe-c6ad056eb818/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/64d812fb-4af2-42b2-96db-f7ca42323237/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2aeb9a9d-f399-45f2-81a5-05091be90192/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5fc79d5e-fbfd-4f3c-9760-97625f96280e/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f6c9e232-63a8-4424-b83f-deb808c9bb5c/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/024a7365-13ab-4034-a24e-361d555ee315/Untitled.png)

## URL

- /                        → Home page (set user number)
- /about              → Information page
- /random           → select word to draw
- /gamepage      → draw your doodle!
- /resultone        → result page for single user
- /resultmany     → result page for multi users

## Backend API

![스크린샷 2022-08-05 오후 8.32.43.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ce7b29ce-5032-4b32-a899-8a493d8086e9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-08-05_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.32.43.png)

## AI Dataset

- DataSet :  Google의 Quick Draw
- Training Code in Colab

[Google Colaboratory](https://colab.research.google.com/drive/1sSnOBSFTOP6fxMCGxgl1RJNopvbY8xOJ?usp=sharing)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3c22db92-26aa-4db0-ae08-0299b531fdc1/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee961f48-7a88-4b9c-b687-bec6633edb4c/Untitled.png)

 ‘Quick, Draw!’ 에서 제공된 Dataset을 이용해 AI Model Training

![ezgif.com-gif-maker (5).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aeed9739-7d6e-44d6-b486-49eb5e75632c/ezgif.com-gif-maker_(5).gif)

## Tech Stack

```jsx
Frontend : React, Javascript, TailwindCSS, axios
WSGI : Gunicorn
Web Server : Nginx
Backend : Flask
AI: Flask, TensorFlow, Celery, Karas, Colab,  Google A.I Experiment
Database : MySQL, S3 Bucket
API Documentation : Swagger
Etc : RabbitMQ(Queue), Prometheus, Grafana, Docker, AWS LightSail, 
      GitKraken, Zeplin, Figma
```

(여기에 이쁘게 아래 사진 같은거 추가)

```markdown
|Frontend|Backend|AI|DevOps|Etc|
|:------:|:---:|:---:|:---:|:---:|
|![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)<br>![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)<br>![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?&style=for-the-badge&logo=TailwindCSS&logoColor=white)<br>![axios](https://img.shields.io/badge/axios-0.27.2-661ddf.svg?)|![Python](https://img.shields.io/badge/python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000.svg?style=for-the-badge&logo=Flask&logoColor=white)<br>![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![AmazonS3](https://img.shields.io/badge/AmazonS3-569A31?style=for-the-badge&logo=AmazonS3&logoColor=white)<br>![Swagger](https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=white)<br>![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=Gunicorn&logoColor=white)</br>|![Tensorflow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white)</br>![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white)<br>![Celery](https://img.shields.io/badge/Celery-37814A.svg?style=for-the-badge&logo=Celery&logoColor=white)<br>![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=RabbitMQ&logoColor=white)<br>![GoogleColab](https://img.shields.io/badge/GoogleColab-FF6F00?style=for-the-badge&logo=GoogleColab&logoColor=white)</br>|![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)<br>![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)<br>![Docker](https://img.shields.io/badge/docker-F9AB00.svg?style=for-the-badge&logo=docker&logoColor=white)|![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)<br>![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=Grafana&logoColor=white) ![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)<br>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a5c4d715-b8fc-462e-bf67-356017e18652/Untitled.png)

## **Initialization**

- clone the repository

```bash
$ git clone https://github.com/ALLBACK-2022/DoodleDoodle.git
$ cd DoodleDoodle
```

### 1) Docker

- docker compose build and up

```bash
$ cd DoodleDoodle
$ docker-compose up --build
```

### 2) Local **execution**

```bash
$ cd DoodleDoodle/frontend
$ npm start
$ cd ../backend
$ flask run
```

### Directory Structure (프론트, 백엔드, AI)

```bash
frontend
├─build
├─dist
├─node_modules
├─public
└─src
    ├─assets
    │  ├─fonts
    │  └─icons
    ├─components
    └─pages

nginx
├─Dockerfile
└─nginx.conf

backend
├─temp
├─app.py
├─connection.py
├─manage.py
└─models.py

ai
├─ai-model
├─app.py
├─connection.py
├─manage.py
└─consumer.py
```

## Team ‘ALLBACK’

Design : 김하린, 홍다연

Frontend : 김하린, 정훈희, 홍다연, 김승진

Backend : 정윤호, 김승진, 한지원, 김하린

AI : 한지원, 정훈희, 김승진

DevOps : 김승진, 한지원, 정윤호
