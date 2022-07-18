from cgitb import text
from celery import celery
from time import sleep

# 앱 이름과 broker 설정(heroku상의 rabbitmq url)
app = celery('tasks', broker='amqps://bolerruj:aLY*************-EeMMLjd15VZ@jaguar.rmq.cl*****rruj')

@app.task
def reverse(text):
	    sleep(3)
    return text[::-1]
