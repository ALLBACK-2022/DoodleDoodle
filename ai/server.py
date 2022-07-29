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

# app.config['MYSQL_DB'] = MYSQL_USER
# app.config['MYSQL_USER'] = MYSQL_USER
# app.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
# app.config['MYSQL_HOST'] = MYSQL_HOST
# app.config['SQLALCHEMY_DATABASE_URI'] = sqlurl
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# class_names = []
# # Read class names
# with open("./ai-model/classes.txt", "r") as ins:
#   for line in ins:
#     class_names.append(line.rstrip('\n'))
    
# # Load the model
# model = keras.models.load_model('./ai-model/6000_30_128.h5')
# #model.summary()

# @app.route("/AI", methods=['POST'])
# def index():
#     if request.method =='POST':

#         #post로 json data 받는 부분
#         value = request.get_json()
#         draw_id = value['draw-id']
#         ranword = value['ranword']
#         s3 = s3_connection()
#         filepath = str(draw_id) + '.png'

#         if not os.path.exists('temp'):
#             os.mkdir('temp')

#         if s3_get_object(s3, BUCKET_NAME, 'drawimage/' + filepath, 'temp/' + filepath):
            
#             img = cv2.imread('temp/' + filepath)
#             img = cv2.resize(img, (28, 28))
#             img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#             img = img.reshape((28, 28, 1))
#             img = (255 - img) / 255

#             for x in range(0, 28):
#                 for y in range(0, 28):
#                     num = img[x][y] - 1
#                     if num < 0:
#                         num *= -1
#                     img[x][y] = num

#             pred = model.predict(np.expand_dims(img, axis=0))[0]

#             ind = (-pred).argsort()[:]
#             otherResults, result, flag, now = {}, {}, True, datetime.datetime.now().replace(microsecond=0)
            
#             for x in range(0, len(ind)):
#                 if(class_names[ind[x]] == ranword):
#                     result[ranword] = round(pred[ind[x]]*100, 1)
#                     selectByWord = db.session.query(models.Dictionary).filter(models.Dictionary.eng_name == ranword).first().id
#                     selectDictionary = db.session.query(models.Dictionary).filter(models.Dictionary.id == selectByWord).first().id
#                     selectDraw = db.session.query(models.Draw).filter(models.Draw.game_id == draw_id).first().game_id
#                     row = models.Result(similarity=result[class_names[ind[x]]] , draw_id=draw_id, dictionary_id=selectDictionary, game_id=selectDraw,\
#                         created_at=now, updated_at=now)
#                     db.session.add(row)
#                     if flag:
#                         flag = False
#                 if x < 5:
#                     otherResults[class_names[ind[x]]] = round(pred[ind[x]]*100, 1)
#                     selectByWord = db.session.query(models.Dictionary).filter(models.Dictionary.eng_name == class_names[ind[x]]).first().id
#                     selectDictionary = db.session.query(models.Dictionary).filter(models.Dictionary.id == selectByWord).first().id
#                     selectDraw = db.session.query(models.Draw).filter(models.Draw.game_id == draw_id).first().game_id
#                     row = models.Result(similarity=otherResults[class_names[ind[x]]] , draw_id=draw_id, dictionary_id=selectDictionary, game_id=selectDraw,\
#                         created_at=now, updated_at=now)
#                     db.session.add(row)
            
#             if flag:
#                 result[ranword] = 0.0
#                 selectByWord = db.session.query(models.Dictionary).filter(models.Dictionary.eng_name == ranword).first().id
#                 selectDictionary = db.session.query(models.Dictionary).filter(models.Dictionary.id == selectByWord).first().id
#                 selectDraw = db.session.query(models.Draw).filter(models.Draw.game_id == draw_id).first().game_id
#                 row = models.Result(similarity=0.0 , draw_id=draw_id, dictionary_id=selectDictionary, game_id=selectDraw,\
#                     created_at=now, updated_at=now)
#                 db.session.add(row)
                
#             db.session.commit()
#             otherResults['result'] = result

#             os.remove('temp/' + filepath)
#             return (otherResults, 200)
                
#         return ("can't download file", 400)
        

# if __name__ =='__main__':
#     app.run(port=5001, debug=True)
