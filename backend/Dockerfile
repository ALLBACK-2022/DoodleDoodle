FROM python:3.8
# This prevents Python from writing out pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# This keeps Python from buffering stdin/stdout
ENV PYTHONUNBUFFERED 1

WORKDIR /backend
RUN pip install --upgrade pip

RUN FLASK_ENV=development
ENV FLASK_APP=app:app
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
# RUN pip3 install --upgrade pip && pip3 install --no-cache-dir Flask flask_prometheus_metrics
COPY . ./

# EXPOSE 5000

# CMD gunicorn --bind=0.0.0.0:5000 --statsd-host=${STATSD_HOST}:${STATSD_PORT} --statsd-prefix=${APP_NAME} app:app
    

# CMD ["bash", "-c", "python manage.py db migrate"]

<<<<<<< develop
<<<<<<< develop
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
CMD ./wait-for-it.sh db:3306 -- gunicorn --bind 0.0.0.0:5000 --statsd-host=${STATSD_HOST}:${STATSD_PORT} --statsd-prefix=${APP_NAME} app:app
# CMD [ "gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
=======
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD [ "./wait-for-it.sh", "db:3306", "--", "gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
>>>>>>> feat: add wait-for-it files and setting on docker
=======
COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh
CMD [ "./wait-for-it.sh", "db:3306", "--", "gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
# CMD [ "gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
>>>>>>> fix: error in docker and wait for it
