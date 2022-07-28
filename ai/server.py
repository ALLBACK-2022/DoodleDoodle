# """
# Flask Server with AI model
# """
# from flask import Flask, request
# from tensorflow import keras
# import numpy as np
# import cv2
# import os
# #from ai.connection import conn
# from .connection import s3_connection, s3_get_object
# #from conf import BUCKET_NAME
# #from . import conf as BUCKET_NAME
# from .config import BUCKET_NAME
# #from connection import s3_connection, s3_get_object
# from sqlalchemy import create_engine
# from .models import db
# import models, datetime

# from ai.app import celery_app
# #from ai.connection import conn
# from .connection import s3_connection, s3_get_object
# #from conf import BUCKET_NAME
# #from . import conf as BUCKET_NAME
# from .conf import BUCKET_NAME
# #from connection import s3_connection, s3_get_object

# app = Flask(__name__)
# db.init_app(app)

# MYSQL_USER=os.environ.get("MYSQL_USER")
# MYSQL_PASSWORD=os.environ.get("MYSQL_PASSWORD")
# MYSQL_ROOT_PASSWORD=os.environ.get("MYSQL_ROOT_PASSWORD")
# MYSQL_USER=os.environ.get("MYSQL_USER")
# MYSQL_DATABASE=os.environ.get("MYSQL_DATABASE")
# MYSQL_HOST=os.environ.get("MYSQL_HOST")
# MYSQL_PORT=os.environ.get("MYSQL_PORT")

# sqlurl = 'mysql+pymysql://root:' + MYSQL_ROOT_PASSWORD + '@' + MYSQL_HOST + ':3306/DoodleDoodle'
# engine = create_engine(sqlurl)

# # Load the model
# model = keras.models.load_model('./ai-model/doodleNet-model.h5')
# #model.summary()

# @app.route("/AI", methods=['POST'])
# def index():

#     #     return render_template('index.html')
#     if request.method =='POST':

#         #post로 json data 받는 부분
#         value = request.get_json()
#         draw_id = value['draw_id']
#         ranword = value['ranword']
#         # parameter_dict = request.args.to_dict() 
#         # if len(parameter_dict) == 0:
#         #     return 'No parameter'
#         # #랜덤 단어와 이미지 url을 받아온다.
#         # ranword=''
#         # for key in parameter_dict.keys():
#         #     ranword += request.args[key]

#         s3 = s3_connection()
#         #path = './temp'
#     #path = 'temp'
#     #os.mkdir(path)
#     #filepath = str(game_id) + '_' + str(draw_no) + '.png'
#     filepath = str(draw_id) + '.png'
#     #https://doodle-bucket.s3.ap-northeast-2.amazonaws.com/drawimage/1.png

#     # url=str(s3_get_object(s3, BUCKET_NAME, 'drawimage/1.png', 'temp/1.png'))
#     # print(url)

#     if not os.path.exists('temp'):
#             os.mkdir('temp')

#     if s3_get_object(s3, BUCKET_NAME, 'drawimage/' + filepath, 'temp/' + filepath):
#         print('s3_get_object',s3_get_object)
#         ranword = ranword

#         # img = plt.imread('temp/' + filepath)
#         # img = img[:, :, 0]
#         # img = resize(img, (28, 28))
#         img = cv2.imread('ai-model/umbrella.png')
#         img = cv2.resize(img, (28, 28))
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#         img = img.reshape((28, 28, 1))
#         img = (255 - img) / 255

#         for x in range(0, 28):
#             for y in range(0, 28):
#                 num = img[x][y] - 1
#                 if num < 0:
#                     num *= -1
#                 img[x][y] = num

#         pred = model.predict(np.expand_dims(img, axis=0))[0]
#         # all sequence with similarity sorted by highest.
#         ind = (-pred).argsort()[:]
#         otherResults = {}
#         result = {}
#         for x in range(0, len(ind)):
#             if(class_names[ind[x]] == ranword):
#                 result[class_names[ind[x]]] = str(round(pred[ind[x]]*100, 2))+'%'
#             if x < 5:
#                 otherResults[class_names[ind[x]]] = str(round(pred[ind[x]]*100, 2)) + '%'

#         otherResults['result'] = result

#         #os.remove('temp/' + filepath)
#         return (otherResults, 200)

#         # 결과 db에 저장 ?
               
#     return ("can't download file", 400)
        

# if __name__ =='__main__':
#     app.run(port=5001, debug=True)
