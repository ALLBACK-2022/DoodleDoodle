from flask import Flask, request, jsonify
from celery.utils.log import get_task_logger
from celery import Celery
from dotenv import load_dotenv
import sys, time, os

load_dotenv()

MYSQL_ROOT_PASSWORD=os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_DATABASE=os.environ.get("MYSQL_DATABASE")
MYSQL_USER=os.environ.get("MYSQL_USER")
MYSQL_PASSWORD=os.environ.get("MYSQL_PASSWORD")
MYSQL_HOST=os.environ.get("MYSQL_HOST")
RABBITMQ_DEFAULT_USER=os.environ.get("RABBITMQ_DEFAULT_USER")
RABBITMQ_DEFAULT_PASS=os.environ.get("RABBITMQ_DEFAULT_PASS")

os.chdir('/ai')

def make_celery(app):
    celery = Celery(
        'ai',
        broker=app.config['broker_url'],
        # backend='rpc://',
        backend=app.config['result_backend'],
        include=['ai.tasks']
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery


logger = get_task_logger(__name__)


app = Flask(__name__)

app.config.update(
    broker_url='amqp://'+RABBITMQ_DEFAULT_USER+':'+RABBITMQ_DEFAULT_PASS+'@rabbitmq:5672/',
    result_backend='db+mysql://'+ MYSQL_USER +':'+ MYSQL_PASSWORD +'@db/DoodleDoodle'
)

celery_app = make_celery(app)

@app.route('/api/v1/start_predict' ,methods=['POST'])
def call_method():
    value = request.get_json()
    draw_id = value['draw_id']
    ranword = value['ranword']

    task = celery_app.send_task('ai_predict', kwargs={
        'draw_id': draw_id, 'ranword': ranword})

    task_id = task.id
    rettaskid = {"task_id":task_id}

    return rettaskid


@app.route('/simple_task_status/<task_id>')
def get_status(task_id):
    status = celery_app.AsyncResult(task_id, app=celery_app)
    print("Invoking Method ")
    return "Status of the Task " + str(status.state)

#작업결과
@app.route('/simple_task_result/<task_id>')
def task_result(task_id):
    ret = celery_app.AsyncResult(task_id).get()
    return ret

if __name__ == '__main__':
    app.run()
