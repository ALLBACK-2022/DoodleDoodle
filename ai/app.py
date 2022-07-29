import os
from faulthandler import cancel_dump_traceback_later
from flask import Flask, request, jsonify
from celery.utils.log import get_task_logger

from celery import Celery

import sys
import time
from dotenv import load_dotenv


load_dotenv()

MYSQL_ROOT_PASSWORD=os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_DATABASE=os.environ.get("MYSQL_DATABASE")
MYSQL_USER=os.environ.get("MYSQL_USER")
MYSQL_PASSWORD=os.environ.get("MYSQL_PASSWORD")
MYSQL_HOST=os.environ.get("MYSQL_HOST")
RABBITMQ_DEFAULT_USER=os.environ.get("RABBITMQ_DEFAULT_USER")
RABBITMQ_DEFAULT_PASS=os.environ.get("RABBITMQ_DEFAULT_PASS")

# print('os.environ.get("RABBITMQ_DEFAULT_USER")>>',os.environ.get("RABBITMQ_DEFAULT_USER"))
# print('os.environ.get("RABBITMQ_DEFAULT_PASS")>>',os.environ.get("RABBITMQ_DEFAULT_PASS"))

#logger.info('os.getcwd()',os.getcwd())
# print('현재 실행 중인 작업 경로는 in app.py os.getcwd()',os.getcwd())
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
    #broker_url='amqp://'+RABBITMQ_DEFAULT_USER+':'+RABBITMQ_DEFAULT_PASS+'@rabbit:5672/',
    broker_url='amqp://'+RABBITMQ_DEFAULT_USER+':'+RABBITMQ_DEFAULT_PASS+'@rabbitmq:5672/',
    result_backend='db+mysql://'+ MYSQL_USER +':'+ MYSQL_PASSWORD +'@db/DoodleDoodle'
   
    #result_backend='db+mysql://'+MYSQL_USER+':'+MYSQL_ROOT_PASSWORD+'@db/DoodleDoodle'

    # result_backend='db+mysql://'+MYSQL_USER+':'+MYSQL_ROOT_PASSWORD+'@db/DoodleDoodle'

)

celery_app = make_celery(app)


@app.route('/api/v1/start_predict', methods=['GET'])
def call_method():
    #app.logger.info("Invoking Method ")
    draw_id=1
    ranword='umbrella'
    #post로 json data 받는 부분, postMan test를 위해선 지워야함.
    # value = request.get_json()
    # draw_id = value['draw_id']
    # ranword = value['ranword']

    # get으로 ranword 받는 부분
    # if request.method =='GET':
    #     parameter_dict = request.args.to_dict()

    #     if len(parameter_dict) == 0:
    #          return 'No parameter'

    #     for key in parameter_dict.keys():
    #         ranword += request.args[key]
    #         draw_id += request.args[key]

    #     print(ranword,'/',draw_id)

    task = celery_app.send_task('ai_predict', kwargs={
        'draw_id': draw_id, 'ranword': ranword})

    task_id = task.id
    # app.logger.info(r.backend)
    return task_id

# -----------원래 코드
# @app.route('/simple_start_task')
# def call_method():
#     #app.logger.info("Invoking Method ")
#     task = celery_app.send_task('ai_predict', kwargs={
#         'game_id': 1, 'draw_no': 1, 'ranword': 'umbrella'})
#     #task = celery.apply_async('tasks.ai_predict', kwargs={'game_id': 1, 'draw_no': 1, 'ranword': 'umbrella'})
#     task_id = task.id
#     # app.logger.info(r.backend)
#     return task_id


@app.route('/simple_task_status/<task_id>')
def get_status(task_id):
    status = celery_app.AsyncResult(task_id, app=celery_app)
    print("Invoking Method ")
    return "Status of the Task " + str(status.state)

# 작업결과


@app.route('/simple_task_result/<task_id>')
def task_result(task_id):
    result = celery_app.AsyncResult(task_id).result
    return "Result of the Task " + str(result)
    # db에 저장?


# S3 버킷 test
# s3 = s3_connection()
# url = str(s3_get_object(s3, BUCKET_NAME, 'drawimage/1.png', './temp/1.png'))
# print('s3test:',url)

if __name__ == '__main__':
    app.run()
# cancel_dump_traceback_later
#     app.run()
