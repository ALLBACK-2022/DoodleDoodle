from celery import Celery
from app import app
import os

RABBITMQ_DEFAULT_USER=os.environ.get("RABBITMQ_DEFAULT_USER")
RABBITMQ_DEFAULT_PASS=os.environ.get("RABBITMQ_DEFAULT_PASS")

# celery = Celery(__name__)
# app = Celery('tasks', broker='pyamqp://' + RABBITMQ_DEFAULT_USER + ':' + RABBITMQ_DEFAULT_PASS + '@rabbitmq//')
#app.config_from_object('celeryconfig')
