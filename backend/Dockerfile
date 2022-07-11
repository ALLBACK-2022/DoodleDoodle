FROM python:3.10.5
# This prevents Python from writing out pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# This keeps Python from buffering stdin/stdout
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
RUN pip install --upgrade pip
RUN pip install -U flask
RUN pip install -U flask-cors
RUN pip install Flask-Session
RUN pip install CMake
RUN pip install dlib
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
# RUN pip3 install --upgrade pip && pip3 install --no-cache-dir Flask flask_prometheus_metrics
COPY . ./
# COPY . /app
# docker build -t backend-img .
# docker run --name backend-con -it -p 5000:5000 --rm backend-img

#curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

