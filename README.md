# DoodleDoodle: 사용자의 그림을 AI가 맞추고 분석해주는 서비스


[www.drawingdoodle.com](http://www.drawingdoodle.com/)

[Go to medium.com article!](https://medium.com/@dayon0325/doodle-doodle-drawing-that-ai-guesses-d1f2e7c50c4b)


본 서비스는 사용자가 단어를 보고 그림을 그리면 사용자가 그린 그림을 AI 모델을 통해 무엇을 그렸는지 유추하고,   
그 결과를 퍼센트로 변환하여 사용자가 그린 그림이 제시어와 얼마나 유사한지 알려주는 서비스 입니다. 

<p align="center">
<img src = "https://user-images.githubusercontent.com/95288297/184758633-21789c94-b510-402e-bf72-3825322e1461.gif">  
</p>
<p />

## System Architecture

<p align="center">
<img width="70%" src = "https://user-images.githubusercontent.com/87285536/183125649-dcbed255-9829-40df-b762-21c66dcd8683.png">
</p>
<p />

## Features

- Main Feature: 사용자가 그린 그림이 서비스에서 제시한 단어와 얼마나 유사한지 AI가 분석한 결과를 제공
- Additional Feature: 사용자가 그린 그림을 보고 AI가 추측한 결과 + 카카오톡을 통해 결과 및 사진 공유

<p />

### PC Page

**Main**|**Information**
-----|-----
<img src = "https://user-images.githubusercontent.com/87285536/183126857-1a6d4f4d-5eca-4642-8905-de17b916f11b.png" width="100%">|<img src = "https://user-images.githubusercontent.com/87285536/183129494-d02d6fb0-0ea1-42a6-a4ad-cea33bcd4f66.png" width="100%">
서비스에 참여하는 인원수를 설정한 후, start 버튼을 눌러 시작합니다.|이 프로젝트와 팀원 깃허브링크, 참고한 웹사이트 링크,  서비스 참여 방법을 제공합니다.

**Choose a word to draw**|**Draw the word on canvas**
-----|-----
<img src = "https://user-images.githubusercontent.com/87285536/183129750-2f08b0d8-fb9a-4bc9-a902-ab1efae2b9ae.png" width="100%">|<img src = "https://user-images.githubusercontent.com/87285536/183129775-743a7551-e917-4f3e-a510-a666c10c7804.png" width="100%">
랜덤으로 생성되는 단어 중에 그리고 싶은 단어를 고릅니다.| 앞서 선택했던 단어에 맞게 그림을 그립니다

**The results of one doodle**|**The results of several doodles**
-----|-----
<img src = "https://user-images.githubusercontent.com/87285536/183130430-df1ab55d-d9e3-4ed8-a139-e3109106546c.png" width="100%">|<img src = "https://user-images.githubusercontent.com/87285536/183130463-c879b3d7-e7f4-475a-89f5-45ecdc3bdbc0.png" width="100%">
AI가 선택했던 단어와 얼마나 유사하다고 예측했는지, 그리고 이 그림을 보고 유사하다고 생각한 상위5개 결과를 유저의 그림과 함께 보여줍니다.| 참여한 유저들의 그림과 함께 선택했던 단어의 유사도를 기준으로 순위를 매겨 보여줍니다.

**Kakao Talk sharing**
자랑하기(PC), 공유 아이콘(모바일)을 누르면 이렇게 AI가 분석한 결과와 함께, 그렸던 그림을 공유할 수 있습니다!
<p align="left">
<img width="25%" src = "https://user-images.githubusercontent.com/87285536/183130904-766c32d3-ea93-43bb-b379-909c9f90a320.png" width="300">
</p>

### Mobile Page
<p align="center">
<img width="25%" src = "https://user-images.githubusercontent.com/87285536/183131511-08ccb2c4-c37c-4096-a6fe-f2af08271e00.png" >
<img width="25%" src = "https://user-images.githubusercontent.com/87285536/183131545-e2eb7f06-54ae-42d5-8b59-dcf14e514687.png" >
<img width="25%" src = "https://user-images.githubusercontent.com/87285536/183131582-3d3c8381-1446-461d-9aef-94f8562299cf.png" >  

<img width="25%" src = "https://user-images.githubusercontent.com/87285536/183131685-79b8cf05-bd44-44d9-b5ae-7273dc3a718c.png" >
<img width="25%" src = "https://user-images.githubusercontent.com/87285536/183131838-a5a7d534-486c-4e84-87c4-4d922587e997.png" >
<img width="25%" src = "https://user-images.githubusercontent.com/87285536/183131866-839a8c25-5c4b-47eb-a022-c709c66f7181.png" >
</p>
    
## URL

- /                        → Home page (set user number)
- /about              → Information page
- /random           → select word to draw
- /gamepage      → draw your doodle!
- /resultone        → result page for single user
- /resultmany     → result page for multi users

## Backend API
<img width="60%" src = "https://user-images.githubusercontent.com/87285536/183132037-e67ed6e8-853f-411f-a331-36492b8a7f00.png" width="100%">

## AI Dataset

- DataSet :  Google의 Quick Draw
- Training Code in Colab

[Google Colaboratory](https://colab.research.google.com/drive/1sSnOBSFTOP6fxMCGxgl1RJNopvbY8xOJ?usp=sharing)

<p align="center">
<img width="70%" src ="https://user-images.githubusercontent.com/87285536/183132209-ccbc1f56-cd43-4d44-abcf-9aa5f6730491.gif" width="100%">
</p>

## Tech Stack

|Frontend|Backend|AI|DevOps|Etc|
|:------:|:---:|:---:|:---:|:---:|
|![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)<br>![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)<br>![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?&style=for-the-badge&logo=TailwindCSS&logoColor=white)<br>![axios](https://img.shields.io/badge/axios-0.27.2-661ddf.svg?)|![Python](https://img.shields.io/badge/python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000.svg?style=for-the-badge&logo=Flask&logoColor=white)<br>![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![AmazonS3](https://img.shields.io/badge/AmazonS3-569A31?style=for-the-badge&logo=AmazonS3&logoColor=white)<br>![Swagger](https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=white)<br>![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=Gunicorn&logoColor=white)</br>|![Tensorflow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white)</br>![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white)<br>![Celery](https://img.shields.io/badge/Celery-37814A.svg?style=for-the-badge&logo=Celery&logoColor=white)<br>![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=RabbitMQ&logoColor=white)<br>![GoogleColab](https://img.shields.io/badge/GoogleColab-FF6F00?style=for-the-badge&logo=GoogleColab&logoColor=white)</br>|![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)<br>![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)<br>![Docker](https://img.shields.io/badge/docker-F9AB00.svg?style=for-the-badge&logo=docker&logoColor=white)|![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)<br>![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=Grafana&logoColor=white) ![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)<br>


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
