from celery import Celery
from flask import Flask

BROKER_URL = 'amqp://jiwon:jiwon@localhost:5672/'
CELERY_RESULT_BACKEND  =  'db+mysql://scott:tiger@localhost/foo'
app = Celery('tasks', broker=BROKER_URL)
#app = Celery('tasks', broker=BROKER_URL, backend=CELERY_RESULT_BACKEND)

@app.task
def add(x, y):
        return x + y

@app.task
def callback( results ):
    return results


if __name__ =='__main__':
    app.run(port=5001, debug=True)