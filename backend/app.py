from fileinput import filename
from flask import Flask, jsonify, request
from flask_restx import Resource, Api
from dotenv import load_dotenv
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from connection import s3_connection, s3_put_object, s3_get_image_url
from config import BUCKET_NAME, BUCKET_REGION
import os, models, random, json

app = Flask(__name__)
load_dotenv()
CORS(app)
api = Api(app)

MYSQL_USER=os.environ.get("MYSQL_USER")
MYSQL_PASSWORD=os.environ.get("MYSQL_PASSWORD")
MYSQL_ROOT_PASSWORD=os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_USER=os.environ.get("MYSQL_USER")
MYSQL_DATABASE=os.environ.get("MYSQL_DATABASE")
MYSQL_HOST=os.environ.get("MYSQL_HOST")
sqlurl = 'mysql+pymysql://root:' + MYSQL_ROOT_PASSWORD + '@' + MYSQL_HOST + ':3306/DoodleDoodle'

app.config['MYSQL_DB'] = MYSQL_USER
app.config['MYSQL_USER'] = MYSQL_USER
app.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
app.config['MYSQL_HOST'] = MYSQL_HOST
app.config['SQLALCHEMY_DATABASE_URI'] = sqlurl
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

ns = api.namespace('/', description='DoodleDoodle API')
parser = ns.parser()
file_parser = ns.parser()
result_parser = ns.parser()

db = SQLAlchemy()
db.init_app(app)


def insert_word():
    f1 = open("classes.txt", "r", encoding="utf-8")
    f2 = open("engclasses.txt", "r", encoding="utf-8")
    lines1 = f1.readlines()
    lines2 = f2.readlines()
    for idx, line in enumerate(lines1):
        row = models.Dictionary(name=line.rstrip(), eng_name=lines2[idx].rstrip(), img_url="")
        db.session.add(row)
    db.session.commit()
    f1.close()
    f2.close()



with app.app_context():
    word = db.session.query(models.Dictionary).filter(models.Dictionary.id == 1).first()
    if word is None:
        insert_word()


s3 = s3_connection()

@ns.route("/", methods=['GET'])
class main_page(Resource):
    
    def get(self):
        return 'Doodle, Doodle!'


@ns.route("/user-num", methods=['POST'])
class user_num(Resource):
    
    def post(self):
        value = request.get_json()
        #print(value)
        if value['user-num'] > 6:
            return ('too many users', 400)
        elif value['user-num'] < 1:
            return ('no user', 400)
        row = models.Game(random_word="", player_num=value['user-num'])
        db.session.add(row)
        db.session.commit()
        return (row.serialize(), 201)


@ns.route("/randwords", methods=['GET', 'POST'])
class randwords(Resource):
    
    def get(self):
        randword = db.session.query(models.Dictionary).filter(models.Dictionary.id == random.randint(1, 345))
        if randword.first() is None:
            return ('Can not access data', 400)
        return (randword[0].name, 200)
    
    def post(self):
        value = request.get_json()
        if not value:
            return('no word found', 400)
        selectgame = db.session.query(models.Game).filter(models.Game.id == value['id']).first()
        selectgame.random_word = value['name']
        db.session.commit()
        return ('random word saved', 201)

@ns.route("/save",methods=['POST'])
class save(Resource):

#filename: 파일명 ./temp 파일경로로 확인하기 
    def post(self):
        value = request.form.to_dict(flat=False)
        f = request.files['filename']
        f.save('temp/'+ str(value['game-id'][0]) + '_' + str(value['draw-no'][0])+'.png')
        
        print(value)
        retPut = s3_put_object(s3, BUCKET_NAME, 'temp/'+ str(value['game-id'][0]) + '_' + str(value['draw-no'][0])+'.png',
         'drawimage/' + str(value['game-id'][0]) + '_' + str(value['draw-no'][0])+'.png')

        if retPut :
            
            retGet = s3_get_image_url(s3,'drawimage/' + str(value['game-id'][0]) + '_' + str(value['draw-no'][0])+'.png')
            row = models.Draw(draw_no=value['draw-no'], doodle=retGet, game_id=value['game-id'])
            db.session.add(row)
            db.session.commit()
            return('draw saved success',201)
        else:
           # print("파일 저장 실패")
            return('draw saved fail',400)

@ns.route("/results/player",methods=['POST'])
class player(Resource):

    def post(self):
        value = request.get_json()
        ret = db.session.query(models.Draw).filter(models.Draw.game_id == value['game-id'])\
            .filter(models.Draw.draw_no == value['draw-no']).first()
        selecturl = ret.doodle
        db.session.commit()
        #print(selecturl)
        return(selecturl,201)


if __name__=="__main__":
    app.run(port="5000", debug=True)