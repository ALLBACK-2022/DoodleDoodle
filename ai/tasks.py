from celery.utils.log import get_task_logger
from ai.app import celery_app
from flask import Flask
from flask_cors import CORS
# ----------S3------------------
#from ai.connection import conn
from .connection import s3_connection, s3_get_object
#from conf import BUCKET_NAME
#from . import conf as BUCKET_NAME
from .config import BUCKET_NAME
#from connection import s3_connection, s3_get_object
# ----------AI------------------
#import keras
from tensorflow import keras
import numpy as np
import os
from skimage.transform import resize
import matplotlib.pyplot as plt
# ----------DB-----------------
from sqlalchemy import create_engine
from .models import db
from . import models
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
logger = get_task_logger(__name__)
logger.info(os.getcwd())
# print('현재 실행 중인 작업 경로는 in task.py :', os.getcwd())
# os.chdir('C://Users//jiwon//DoodleDoodle_RabbitCeleryConn//DoodleDoodle//ai')
os.chdir('/ai')
# print('바뀐 작업 경로는 in task.py :', os.getcwd())
MYSQL_USER = os.environ.get("MYSQL_USER")
MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD")
MYSQL_ROOT_PASSWORD = os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_USER = os.environ.get("MYSQL_USER")
MYSQL_DATABASE = os.environ.get("MYSQL_DATABASE")
MYSQL_HOST = os.environ.get("MYSQL_HOST")
MYSQL_PORT = os.environ.get("MYSQL_PORT")
sqlurl = 'mysql+pymysql://root:' + MYSQL_ROOT_PASSWORD + \
    '@' + MYSQL_HOST + ':3306/DoodleDoodle'
engine = create_engine(sqlurl)

# app.config['MYSQL_DB'] = MYSQL_USER
# app.config['MYSQL_USER'] = MYSQL_USER
# app.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
# app.config['MYSQL_HOST'] = MYSQL_HOST
# app.config['SQLALCHEMY_DATABASE_URI'] = sqlurl
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# @celery_app.task(name='ai_predict')
# def ai_predict(game_id, draw_no, ranword):
#     print('ai_predict에 들어옴')
#     logger.info('working!')
#     return ({}, 200)
# with open("classes.txt","r", encoding="utf8") as ins:
# Read class names
# @app.route("/AI", methods=['GET'])
# name='apptask.ai_predict'
@celery_app.task(name='ai_predict')
def ai_predict(draw_id, ranword):
    # logger.info('ai_predict에 들어옴')
    #drawlog= "draw_id>>"+draw_id
    logger.info(draw_id)
    logger.info(ranword)
    s3 = s3_connection()
    #path = './temp'
    #path = 'temp'
    # os.mkdir(path)
    #filepath = str(game_id) + '_' + str(draw_no) + '.png'
    filepath = str(draw_id) + '.png'
    # https://doodle-bucket.s3.ap-northeast-2.amazonaws.com/drawimage/1.png
    # url=str(s3_get_object(s3, BUCKET_NAME, 'drawimage/1.png', 'temp/1.png'))
    # print(url)
    # if not os.path.exists('./temp'):
    #         os.mkdir('./temp')
    if not os.path.exists('temp'):
        os.mkdir('temp')
    #ret = s3_get_object(s3, BUCKET_NAME, 'drawimage/' + filepath, 'temp/'+ filepath)
    if s3_get_object(s3, BUCKET_NAME, 'drawimage/' + filepath, 'temp/' + filepath):
        # print('s3_get_object안에 들어옴', filepath)
        ranword = ranword
        with open("./ai-model/classes.txt", "r", encoding="utf8") as ins:
            class_names = []
            for line in ins:
                class_names.append(line.rstrip('\n'))
        # Load the model
        model = keras.models.load_model('./ai-model/6000_30_128.h5')
        # model.summary()
        # print('tasks.py: 모델 로드 완료')
        img = plt.imread('temp/' + filepath)
        img = img[:, :, 0]
        img = resize(img, (28, 28))
        print('tasks.py: img', img)
        for x in range(0, 28):
            for y in range(0, 28):
                num = img[x][y] - 1
                if num < 0:
                    num *= -1
                img[x][y] = num
        pred = model.predict(np.expand_dims(img, axis=0))[0]
        # all sequence with similarity sorted by highest.
        ind = (-pred).argsort()[:]
        otherResults = {}
        result = {}
        for x in range(0, len(ind)):
            if(class_names[ind[x]] == ranword):
                result[class_names[ind[x]]] = round(pred[ind[x]]*100, 2)
            if x < 5:
                otherResults[class_names[ind[x]]] = round(pred[ind[x]]*100, 2)
        # 결과 DB에 저장
        otherResults, result, flag, now = {}, {
        }, True, datetime.datetime.now().replace(microsecond=0)
        for x in range(0, len(ind)):
            if(class_names[ind[x]] == ranword):
                result[ranword] = round(pred[ind[x]]*100, 1)
                selectByWord = db.session.query(models.Dictionary).filter(
                    models.Dictionary.eng_name == ranword).first().id
                selectDictionary = db.session.query(models.Dictionary).filter(
                    models.Dictionary.id == selectByWord).first().id
                selectDraw = db.session.query(models.Draw).filter(
                    models.Draw.game_id == draw_id).first().game_id
                row = models.Result(similarity=result[class_names[ind[x]]], draw_id=draw_id, dictionary_id=selectDictionary, game_id=selectDraw,
                                    created_at=now, updated_at=now)
                db.session.add(row)
                if flag:
                    flag = False
                # return 할 result에 저장
                result[class_names[ind[x]]] = str(
                    round(pred[ind[x]]*100, 2))+'%'
            if x < 5:
                otherResults[class_names[ind[x]]] = round(pred[ind[x]]*100, 1)
                selectByWord = db.session.query(models.Dictionary).filter(
                    models.Dictionary.eng_name == class_names[ind[x]]).first().id
                selectDictionary = db.session.query(models.Dictionary).filter(
                    models.Dictionary.id == selectByWord).first().id
                selectDraw = db.session.query(models.Draw).filter(
                    models.Draw.game_id == draw_id).first().game_id
                row = models.Result(similarity=otherResults[class_names[ind[x]]], draw_id=draw_id, dictionary_id=selectDictionary, game_id=selectDraw,
                                    created_at=now, updated_at=now)
                db.session.add(row)
                # return 할 result에 저장
                otherResults[class_names[ind[x]]] = str(
                    round(pred[ind[x]]*100, 2)) + '%'
        otherResults['result'] = result
        if flag:
            result[ranword] = 0.0
            selectByWord = db.session.query(models.Dictionary).filter(
                models.Dictionary.eng_name == ranword).first().id
            selectDictionary = db.session.query(models.Dictionary).filter(
                models.Dictionary.id == selectByWord).first().id
            selectDraw = db.session.query(models.Draw).filter(
                models.Draw.game_id == draw_id).first().game_id
            row = models.Result(similarity=0.0, draw_id=draw_id, dictionary_id=selectDictionary, game_id=selectDraw,
                                created_at=now, updated_at=now)
            db.session.add(row)
        db.session.commit()
        # print('tasks.py:결과 도출 성공', otherResults)
        #os.remove('temp/' + filepath)
        return (otherResults, 200)
        # 결과 db에 저장 ?
    return ("can't download file", 400)
    # if request.method =='POST':
    #     #value = request.get_json()
    #     if not value:
    #         return ('No parameter', 400)
    #     #랜덤 단어와 이미지 url을 받아온다.
    #     s3 = s3_connection()
    #     os.mkdir('temp')
    #     filepath = str(value['game-id']) + '_' + str(value['draw-no']) + '.png'
    #     if s3_get_object(s3, BUCKET_NAME, 'drawimage/'+ filepath, 'temp/' + filepath):
    #         ranword = request.args.get('ranword')
    #         img = plt.imread('temp/' + filepath)
    #         img = img[:, :, 0]
    #         img = resize(img, (28, 28))
    #         for x in range(0, 28):
    #             for y in range(0, 28):
    #                 num = img[x][y] - 1
    #                 if num < 0:
    #                     num *= -1
    #                 img[x][y] = num
    #         pred = model.predict(np.expand_dims(img, axis=0))[0]
    #         ind = (-pred).argsort()[:] # all sequence with similarity sorted by highest.
    #         otherResults={}
    #         result={}
    #         for x in range(0,len(ind)):
    #             if(class_names[ind[x]]==ranword):
    #                 result[ class_names[ind[x]] ] = str(round(pred[ind[x]]*100, 2))+'%'
    #             if x<5:
    #                 otherResults[ class_names[ind[x]] ] = str(round(pred[ind[x]]*100, 2)) + '%'
    #         otherResults['result'] = result
    #         os.remove('temp/' + filepath)
    #         return (otherResults, 200)
    #     return ("can't download file", 400)
    # return ("error", 400)