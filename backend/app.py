from fileinput import filename
from flask import Flask, jsonify, request
from flask_restx import Resource, Api
from dotenv import load_dotenv
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from connection import s3_connection, s3_put_object, s3_get_image_url
from config import BUCKET_NAME, BUCKET_REGION
import os, models, random, boto3, json



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
s3 = s3_connection()


def insert_word():
    f1 = open("classes.txt", "r", encoding="utf-8")
    f2 = open("engclasses.txt", "r", encoding="utf-8")
    lines1 = f1.readlines()
    lines2 = f2.readlines()
    for idx, line in enumerate(lines1):
        row = models.Dictionary(name=line.rstrip(), eng_name=lines2[idx].rstrip(),\
            img_url=str(s3_get_image_url(s3, 'image/' + lines2[idx].rstrip() + '.png')))
        db.session.add(row)
    db.session.commit()
    f1.close()
    f2.close()


    
with app.app_context():
    word = db.session.query(models.Dictionary).filter(models.Dictionary.id == 1).first()
    if word is None:
        insert_word()


@ns.route("/", methods=['GET'])
class main_page(Resource):
    
    def get(self):
        return 'Doodle, Doodle!'


@ns.route("/api/v1/games", methods=['POST'])
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


@ns.route("/api/randwords", methods=['GET', 'POST'])
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

@ns.route("/api/v1/draws",methods=['POST'])
class save(Resource):

    def post(self):
        value = request.form.to_dict(flat=False)
        row = models.Draw(draw_no=value['draw-no'], doodle="", game_id=value['game-id'])
        db.session.add(row)
        db.session.commit()
        ret = db.session.query(models.Draw).filter(models.Draw.game_id == value['game-id'])\
            .filter(models.Draw.draw_no == value['draw-no']).first()
        drawid=ret.id
        if not os.path.exists('temp'):
            os.mkdir('temp')
        f = request.files['filename']
        f.save('temp/'+ str(drawid) + '.png')
        retPut = s3_put_object(s3, BUCKET_NAME, 'temp/' + str(drawid) +'.png', 'drawimage/' + str(drawid) +'.png')
        os.remove('temp/' + str(drawid) +'.png')
        gameid = value['game-id']
        game = db.session.query(models.Game).get(gameid)
        if game is None:
            return ('Can not access data', 400)
        ranword = game.random_word
        if retPut is None:
            return('Draw saved fail',400)
        
        retGet = s3_get_image_url(s3, 'drawimage/' + str(drawid) + '.png')
        ret.doodle = retGet
        db.session.commit()
  
        try:
            return_data = {'ranword':ranword,'draw_id':drawid}
            return return_data, 200
        except:                  
            return('Requset to AI fail', 400) 


@ns.route("/api/v1/results/draw/<int:drawid>", methods=['GET'])
class draw(Resource):

    def get(self, drawid):
        ret = db.session.query(models.Draw).filter(models.Draw.id == drawid).first()
        retimage = ret.doodle
        if ret is None:
            return('NO image in database', 400)
        db.session.commit()
        return(retimage, 200)

@ns.route("/api/v1/results/game/<int:gameid>",methods=['GET'])
class game(Resource):

    def get(self, gameid):
        ret = db.session.query(models.Game).filter(models.Game.id == gameid).first()
        retusernum = int(ret.player_num)
        if ret is None:
            return('Can not access data', 400)
        db.session.commit()
        print(retusernum)
        ret1 = []
        ret2 = []
        for i in range(1,retusernum+1):
            row = db.session.query(models.Draw).filter(models.Draw.game_id == gameid).filter(models.Draw.draw_no == i).first()            
            returl = row.doodle
            db.session.commit()
            ret1.append(i)
            ret2.append(returl)
        retdict = { name:value for name, value in zip(ret1, ret2)}
        #print(retdict)
        return (retdict, 200)


if __name__=="__main__":
    app.run(port="5000", debug=True)