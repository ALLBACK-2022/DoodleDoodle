import os
import sys
import time

from celery import Celery

from flask import Flask
from flask import request
from flask import jsonify


def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['result_backend'],
        broker=app.config['broker_url'],
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery


app = Flask(__name__)

app.config.update(
    broker_url='amqp://jiwon:jiwon@localhost:5672/',
    result_backend='db+mysql://scott:tiger@localhost/foo'

    #result_backend='rpc://'
)

celery = make_celery(app)

task_cache = dict()

#app = Celery('tasks', broker=BROKER_URL)
#app = Celery('tasks', broker=BROKER_URL, backend=CELERY_RESULT_BACKEND)


@celery.task()
def add_together(a, b):
    time.sleep(5)
    return a+b

@app.route('/simple_start_task')
def call_method():
    #app.logger.info("Invoking Method ")
    r = celery.send_task('tasks.longtime_add', kwargs={'x': 1, 'y': 2})
    #app.logger.info(r.backend)
    return r.id

@app.route('/adder', methods=['GET'])
def adder():
    global task_cache
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    task = add_together.delay(a, b)
    task_cache[task.id] = task
    return task.id

@app.route('/simple_task_status/<task_id>')
def get_status(task_id):
    status = celery.AsyncResult(task_id, app=celery)
    print("Invoking Method ")
    return "Status of the Task " + str(status.state)
# @app.route('/progress', methods=['GET'])
# def progress():
#     global task_cache
#     task_id = request.args.get('task_id')
#     task = task_cache[task_id]
#     return jsonify({
#         'status': task.ready()
#     })


@app.route('/result', methods=['GET'])
def result():
    global task_cache
    task_id = request.args.get('task_id')
    task = task_cache[task_id]
    return jsonify({
        'result': task.get()
    })


@app.route("/checkStatus", methods=['GET'])
def checkStatus():
    uuid = request.args.get('uuid')
    res = add_together.AsyncResult(uuid)
    print(uuid)
    if res.state == "SUCCESS":
        return "success"
    else:
        return "progress"

# @app.route("/successful", methods=['GET'])
# def successful(self):
#         """Return :const:`True` if the task executed successfully."""
#         return self.state == states.SUCCESS


if __name__ == '__main__':
    app.run(port=5001, debug=True)
