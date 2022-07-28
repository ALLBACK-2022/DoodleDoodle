from celery.utils.log import get_task_logger

from app import celery_app
#from ai.connection import conn
from connection import s3_connection, s3_get_object
#from conf import BUCKET_NAME
#from . import conf as BUCKET_NAME
from config import BUCKET_NAME
#from connection import s3_connection, s3_get_object

#import keras
from tensorflow import keras
import numpy as np
import os
from skimage.transform import resize
import matplotlib.pyplot as plt


logger = get_task_logger(__name__)


logger.info(os.getcwd())
# print('현재 실행 중인 작업 경로는 in task.py :',os.getcwd())
#os.chdir('C://Users//jiwon//DoodleDoodle_RabbitCeleryConn//DoodleDoodle//ai')
os.chdir('/ai')
# print('바뀐 작업 경로는 in task.py :',os.getcwd())

# @celery_app.task(name='ai_predict')
# def ai_predict(game_id, draw_no, ranword):
#     print('ai_predict에 들어옴')
#     logger.info('working!')
#     return ({}, 200)


# with open("classes.txt","r", encoding="utf8") as ins:
# Read class names

with open("./ai-model/classes.txt", "r", encoding="utf8") as ins:

    class_names = []
    for line in ins:
        class_names.append(line.rstrip('\n'))

# Load the model
model = keras.models.load_model('./ai-model/6000_30_128.h5')
# model.summary()


# @app.route("/AI", methods=['GET'])
#name='apptask.ai_predict'
@celery_app.task(name='ai_predict')
def ai_predict(draw_id, ranword):
    # logger.info('ai_predict에 들어옴')
    #drawlog= "draw_id>>"+draw_id
    logger.info(draw_id)
    logger.info(ranword)
    
   
    s3 = s3_connection()
    #path = './temp'
    #path = 'temp'
    #os.mkdir(path)
    #filepath = str(game_id) + '_' + str(draw_no) + '.png'
    filepath = str(draw_id) + '.png'
    #https://doodle-bucket.s3.ap-northeast-2.amazonaws.com/drawimage/1.png
    
    if not os.path.exists('temp'):
        os.mkdir('temp')
    # os.umask(0)
    
    # logger.info(os.getcwd())
    
    if s3_get_object(s3, BUCKET_NAME, 'drawimage/' + filepath, 'temp/' + filepath):
        print(BUCKET_NAME,'drawimage/',filepath)
        # ranword = ranword

        img = plt.imread('temp/' + filepath)
        img = img[:, :, 0]
        img = resize(img, (28, 28))

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
        print(img)
        for x in range(0, len(ind)):
            if(class_names[ind[x]] == ranword):
                result[class_names[ind[x]]] = str(round(pred[ind[x]]*100, 2))+'%'
            if x < 5:
                otherResults[class_names[ind[x]]] = str(round(pred[ind[x]]*100, 2)) + '%'

        otherResults['result'] = result

        # os.remove('temp/' + filepath)
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
