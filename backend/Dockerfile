FROM python:3.8
# This prevents Python from writing out pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# This keeps Python from buffering stdin/stdout
ENV PYTHONUNBUFFERED 1

WORKDIR /backend
RUN pip install --upgrade pip

ENV FLASK_APP=app:app
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
# RUN pip3 install --upgrade pip && pip3 install --no-cache-dir Flask flask_prometheus_metrics
COPY . ./

# EXPOSE 5000

# CMD gunicorn --bind=0.0.0.0:5000 --statsd-host=${STATSD_HOST}:${STATSD_PORT} --statsd-prefix=${APP_NAME} app:app
    

# CMD ["bash", "-c", "python manage.py db migrate"]

COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
CMD ./wait-for-it.sh -t 30 db:3306 -- gunicorn --bind 0.0.0.0:5000 --statsd-host=${STATSD_HOST}:${STATSD_PORT} --statsd-prefix=${APP_NAME} app:app --reload

# CMD [ "gunicorn", "--bind", "0.0.0.0:5000", "app:app"]

