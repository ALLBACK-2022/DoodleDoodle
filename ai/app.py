from importlib.resources import path
from flask import Flask, request, jsonify
from celery.utils.log import get_task_logger
from celery import Celery
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
import sys
import time
import os
from pathlib import Path

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

load_dotenv()

MYSQL_ROOT_PASSWORD = os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_DATABASE = os.environ.get("MYSQL_DATABASE")
MYSQL_USER = os.environ.get("MYSQL_USER")
MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD")
MYSQL_HOST = os.environ.get("MYSQL_HOST")
RABBITMQ_DEFAULT_USER = os.environ.get("RABBITMQ_DEFAULT_USER")
RABBITMQ_DEFAULT_PASS = os.environ.get("RABBITMQ_DEFAULT_PASS")

os.chdir('/ai')


# def _is_complete(task_ids):
#     for task_id in task_ids:
#         status = celery_app.AsyncResult(task_id, app=celery_app)
#         if not (str(status.state) == "SUCCESS" or str(status.state) == "FAILURE"):
#             return str(status.state)
#         elif status == "FAILURE":
#             break
#     else:
#         return 'SUCCESS'
#     return 'FAILURE'


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
    broker_url='amqp://'+RABBITMQ_DEFAULT_USER +
    ':'+RABBITMQ_DEFAULT_PASS+'@rabbitmq:5672/',
    result_backend='db+mysql://' + MYSQL_USER +
    ':' + MYSQL_PASSWORD + '@db/DoodleDoodle'
)

celery_app = make_celery(app)

# AI 작업 요청


@app.route('/api/v1/ai/pictures', methods=['POST'])
@cross_origin()
def call_method():
    request.headers.get('Access-Control-Allow-Origin')
    request.headers.get('Access-Control-Allow-Methods')
    request.headers.get('Access-Control-Allow-Headers')
    request.headers.get('Content-type')
    '''사용자가 그린 그림을 저장한다'''
    #form data로 받는다.
    value = request.form.to_dict(flat=False)
    print(value['randword'])
    print(value)
    randword = value['randword']
    print(randword[0])
    # 파일명으로 저장
    if not os.path.exists('temp'):
        os.mkdir('temp')

    file = request.files['filename']
    #filename= file.filename
    filename = Path(file.filename).stem
    #filename= 'test'
    #path=os.path.join(os.getcwd(),"/temp/", filename)
    #print('os.path.join(os.getcwd(), filename)',path)
    #file.save(path)

    #file.save('temp/' + filename)
    file.save('temp/' + filename + '.png') # 저장은 됨다. 
    #다시 파일 삭제 
    # os.remove('temp/' + str(drawid) + '.png')

    # value = request.get_json()
    # img = value['img']
    # ranword = value['ranword']
    
    print('app.py-> filename',filename)
    # 이미지에 따라서 수정 필요
    task = celery_app.send_task('ai_predict', kwargs={
        'filename': filename, 'randword': randword[0]})

    task_id = task.id
    isTaskid = {"task_id": task_id}
    return isTaskid
# @app.route('/api/v1/start_predict', methods=['POST'])
# def call_method():
#     value = request.get_json()
#     draw_id = value['draw_id']
#     ranword = value['ranword']

#     task = celery_app.send_task('ai_predict', kwargs={
#         'draw_id': draw_id, 'ranword': ranword})

#     task_id = task.id
#     rettaskid = {"task_id": task_id}

#     return rettaskid

# 상태 조회


@app.route('/api/v1/task_status', methods=['POST'])
@cross_origin()
def get_status():
    request.headers.get('Access-Control-Allow-Origin')
    request.headers.get('Access-Control-Allow-Methods')
    request.headers.get('Access-Control-Allow-Headers')
    request.headers.get('Content-type')
    response_data = request.get_json()
    task_id = response_data["task_id"]
    status = celery_app.AsyncResult(task_id, app=celery_app)

    isStatus = {"status": str(status.state)}
    return isStatus

# @app.route('/api/v1/task_status', methods=['POST'])
# def get_status():

#     # 상태 조회 제한 시간
#     start = time.time()

#     status = {"STARTED": 1, "PENDING": 1,
#               "FAILURE": 0, "SUCCESS": 0, "RETRY": 1}
#     response_data = request.get_json()
#     task_ids = response_data["task-id"]
#     res, temp_str = 1, ""
#     while (res):
#         temp_str = _is_complete(task_ids)
#         res = status[str(temp_str)]
#         time.sleep(1.0)
#         # time.sleep(35.0)
#         end = time.time()
#         if((end-start) > 30):
#             print('시간이 초과되었습니다!!')
#             return {"status": "FAILURE"}

#     return {"status": temp_str}

    os.remove('temp/' + str(drawid) + '.png')

# def _is_complete(task_ids):
#     for task_id in task_ids:
#         status = celery_app.AsyncResult(task_id, app=celery_app)
#         print('status', status.state)
#         print('task-id', status)
#         if not (str(status.state) == "SUCCESS" or str(status.state) == "FAILURE"):
#             return str(status.state)
#         elif status.state == "FAILURE":
#             break
#     else:
#         return 'SUCCESS'
#     return 'FAILURE'

# 결과 반환
@app.route('/api/v1/result_predict', methods=['POST'])
@cross_origin()
def task_result():
    request.headers.get('Access-Control-Allow-Origin')
    request.headers.get('Access-Control-Allow-Methods')
    request.headers.get('Access-Control-Allow-Headers')
    request.headers.get('Content-type')
    response_data = request.get_json()
    task_id = response_data["task_id"]
    print('responseData: ', response_data)
    print('request: ', request)
    print('task_id: ', task_id)
    result = celery_app.AsyncResult(task_id).result
    return result

# @app.route('/simple_task_result/<task_id>', methods=['GET'])
# def task_result(task_id):
#     ret = celery_app.AsyncResult(task_id).result
#     return str(ret)

if __name__ == '__main__':
    app.run()
