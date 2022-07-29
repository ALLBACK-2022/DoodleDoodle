FROM python:3.8
# This prevents Python from writing out pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# This keeps Python from buffering stdin/stdout
ENV PYTHONUNBUFFERED 1

WORKDIR /ai

RUN apt-get update \
  && apt-get install -y gcc libc-dev python3-dev default-libmysqlclient-dev

RUN pip install --upgrade pip
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN FLASK_ENV=development

COPY requirements.txt /ai/
RUN pip install -r requirements.txt
# RUN pip3 install --upgrade pip && pip3 install --no-cache-dir Flask flask_prometheus_metrics
COPY . ./

<<<<<<< develop
<<<<<<< develop
<<<<<<< develop
<<<<<<< develop
=======
<<<<<<< feature/hunhui
>>>>>>> feat: add wait-for-it files and setting on docker
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
CMD ./wait-for-it.sh db:3306 -- flask run --host=0.0.0.0
# CMD [ "flask", "run", "--host=0.0.0.0"]
# CMD [ "./wait-for-it.sh", "db:3306", "--", "flask", "run", "--host=0.0.0.0"]
=======
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD [ "./wait-for-it.sh", "db:3306", "--", "flask", "run", "--host=0.0.0.0"]

>>>>>>> feat: add wait-for-it files and setting on docker
<<<<<<< develop
=======
COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh
CMD [ "./wait-for-it.sh", "db:3306", "--", "flask", "run", "--host=0.0.0.0"]
=======
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
CMD ./wait-for-it.sh db:3306 -- flask run --host=0.0.0.0
>>>>>>> fix: fix docker errors
# CMD [ "flask", "run", "--host=0.0.0.0"]
# CMD [ "./wait-for-it.sh", "db:3306", "--", "flask", "run", "--host=0.0.0.0"]
>>>>>>> fix: error in docker and wait for it
=======
>>>>>>> feat: add wait-for-it files and setting on docker
# COPY . /app
# docker build -t backend-img .
# docker run --name backend-con -it -p 5000:5000 --rm backend-img

#curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose