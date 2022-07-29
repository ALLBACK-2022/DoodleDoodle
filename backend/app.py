from flask import Flask, request, Response
from fileinput import filename
import time
from flask import Flask, jsonify, request
from flask_restx import Resource, Api
from dotenv import load_dotenv
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from connection import s3_connection, s3_put_object, s3_get_image_url
from config import BUCKET_NAME, BUCKET_REGION
import os, models, random, logging, requests
from models import db
from flask_migrate import Migrate
from sqlalchemy_utils import database_exists, create_database
from requests.adapters import HTTPAdapter, Retry

app = Flask(__name__)
load_dotenv()
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
api = Api(app)
migrate = Migrate(app, db)

MYSQL_USER = os.environ.get("MYSQL_USER")
MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD")
MYSQL_ROOT_PASSWORD = os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_USER = os.environ.get("MYSQL_USER")
MYSQL_DATABASE = os.environ.get("MYSQL_DATABASE")
MYSQL_HOST = os.environ.get("MYSQL_HOST")
MYSQL_PORT = os.environ.get("MYSQL_PORT")
RABBITMQ_DEFAULT_USER = os.environ.get("RABBITMQ_DEFAULT_USER")
RABBITMQ_DEFAULT_PASS = os.environ.get("RABBITMQ_DEFAULT_PASS")
RABBITMQ_DEFAULT_HOST = os.environ.get("RABBITMQ_DEFAULT_HOST")
sqlurl = 'mysql+pymysql://root:' + MYSQL_ROOT_PASSWORD + \
    '@' + MYSQL_HOST + ':3306/DoodleDoodle'
engine = create_engine(sqlurl)


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

db = SQLAlchemy(app)
s3 = s3_connection()


def insert_word():
    f1 = open("classes.txt", "r", encoding="utf-8")
    f2 = open("engclasses.txt", "r", encoding="utf-8")
    lines1 = f1.readlines()
    lines2 = f2.readlines()
    for idx, line in enumerate(lines1):
        row = models.Dictionary(name=line.rstrip(), eng_name=lines2[idx].rstrip(),
                                img_url=str(s3_get_image_url(s3, 'image/' + lines2[idx].rstrip() + '.png')))
        db.session.add(row)
    db.session.commit()
    f1.close()
    f2.close()

with app.app_context():
    if not database_exists(sqlurl):
        create_database(sqlurl)
    word = db.session.query(models.Dictionary).filter(
        models.Dictionary.id == 1).first()
    if word is None:
        insert_word()


def _is_complete(task_ids):
    # task_id 로 status가 성공인지 아닌지
    for task_id in task_ids:
<<<<<<< develop
        task = db.session.query(models.Celery_taskmeta).filter(models.Celery_taskmeta.task_id == task_id).first()
=======
        task = db.session.query(models.Celery_taskmeta).filter(
            models.Celery_taskmeta.task_id == task_id).first()
>>>>>>> feat: add celery_taskmeta table in models.py, fix restart button
        if task.status == "FAILURE":
            return "FAIL"
        if not task.status == "SUCCESS":
            return "WAIT"
    return "SUCCESS"


def _organize_result(results, randword):
    res = {}
    topfive = []
    for result in results:
        word = {}
        word['dictionary'] = result.dictionary.serialize()
        word['similarity'] = result.similarity
        if result.dictionary.name == randword:
            res['randword'] = word
        topfive.append(word)
    res['topfive'] = topfive
    res['draw-id'] = results[0].draw_id
    res['topfive'] = sorted(
        res['topfive'], key=lambda d: d['similarity'], reverse=True)
    if len(res['topfive']) > 5:
        res['topfive'].pop()
    return res


s3 = s3_connection()

@ns.route("/", methods=['GET'])
class main_page(Resource):

    def get(self):
        app.logger.error("Doodle, Doodle!")
        return 'Doodle, Doodle!'


@ns.route("/api/v1/games", methods=['POST'])
class user_num(Resource):

    def post(self):
        '''사용자의 수를 저장한다'''
        value = request.get_json()
        # print(value)
        if value['user-num'] > 6:
            return ('too many users', 400)
        elif value['user-num'] < 1:
            return ('no user', 400)
        row = models.Game(random_word="", player_num=value['user-num'])
        db.session.add(row)
        db.session.commit()
        # return (json.dumps(row.serialize()), 201)
        return ((row.id), 201)         # 숫자값만 반환 -> 성공


@ns.route("/api/randwords", methods=['GET', 'POST'])
class randwords(Resource):

    def get(self):
        '''랜덤으로 단어를 가져온다'''
        randword = db.session.query(models.Dictionary).filter(
            models.Dictionary.id == random.randint(1, 345))
        if randword.first() is None:
            return ('Can not access data', 400)
        return (randword[0].name, 200)

    def post(self):
        '''최종결정한 단어를 저장한다'''
        value = request.get_json()
        if not value:
            return('no word found', 400)
        selectgame = db.session.query(models.Game).filter(
            models.Game.id == value['id']).first()
        selectgame.random_word = value['name']
        db.session.commit()
        return ('random word saved', 201)


@ns.route("/api/v1/draws", methods=['POST'])
class save(Resource):
    def _translate_word(self, aranword):
        '''한글단어를 영어로 변환한다'''
        row = db.session.query(models.Dictionary).filter(models.Dictionary.name==aranword).first()
        englishword = row.eng_name
        db.session.commit()
        return englishword

    def post(self):
        '''사용자가 그린 그림을 저장한다'''
        value = request.form.to_dict(flat=False)
        row = models.Draw(draw_no=value['draw-no'],
                          doodle="", game_id=value['game-id'])
        db.session.add(row)
        db.session.commit()
        ret = db.session.query(models.Draw).filter(models.Draw.game_id == value['game-id'])\
            .filter(models.Draw.draw_no == value['draw-no']).first()
        drawid = ret.id
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
        englishranword = self._translate_word(ranword)
        if retPut is None:
            return('Draw saved fail',400)
        retGet = s3_get_image_url(s3, 'drawimage/' + str(drawid) + '.png')
        ret.doodle = retGet
        db.session.commit()
        return_data={"draw_id":drawid,"ranword":englishranword}
        session = requests.Session()
        retry = Retry(connect=3, backoff_factor=0.5)
        adapter = HTTPAdapter(max_retries=retry)
        session.mount('http://', adapter)
        session.mount('https://', adapter)
        url = 'http://ai:5000/api/v1/start_predict'
        response = session.post(url,json=return_data)
        response_data = response.json()
        aiResult = response_data["task_id"]
        retdata = {"draw_id":drawid,"task_id":aiResult}
        
        try:           
            return retdata, 200
        except:                  
            return('Requset to AI fail', 400)


@ns.route("/api/v1/results/draw/<int:drawid>", methods=['GET'])
class draw(Resource):
    
    def get(self, drawid):
        '''게임id가 같은 사용자 전체의 그림을 불러온다'''
        ret = db.session.query(models.Draw).filter(models.Draw.id == drawid).first()
        retimage = ret.doodle
        if ret is None:
            return('NO image in database', 400)
        db.session.commit()
        return(retimage, 200)


@ns.route("/api/v1/results/game/<int:gameid>", methods=['GET'])
class game(Resource):
    def get(self, gameid):
        '''사용자가 그렸던 그림을 불러온다'''
        ret = db.session.query(models.Game).filter(models.Game.id == gameid).first()
        retusernum = int(ret.player_num)
        if ret is None:
            return('Can not access data', 400)
        db.session.commit()
        print(retusernum)
        ret1 = []
        ret2 = []
        for i in range(1, retusernum+1):
            row = db.session.query(models.Draw).filter(
                models.Draw.game_id == gameid).filter(models.Draw.draw_no == i).first()
            print(row)
            returl = row.doodle
            db.session.commit()
            ret1.append(i)
            ret2.append(returl)
        retdict = {name: value for name, value in zip(ret1, ret2)}
        # print(retdict)
        return (retdict, 200)


@ns.route("/api/v1/draws/results/single", methods=['POST'])
class singleresult(Resource):
    def post(self):
        '''AI가 분석한 결과를 가져온다(다인)'''
        value = request.get_json()
        # task_id(list 형태) game_id 받기
        task_id = value['task-id']
        draw_id = value['draw-id']
        game = db.session.query(models.Game).get(value['game-id'])
        if game is None:
            return('Can not access data', 400)
        randword = game.random_word
        # task_id들로 task가 완료되었는지 while문을 돌며 check
        while (_is_complete(task_id) == "WAIT"):
            time.sleep(1.0)
        if self._is_complete(task_id) == "FAIL":
            return ("Get result fail", 200)
        # task가 다 완료되었다면 result 받아오기
        results = db.session.query(models.Result).filter(
            models.Result.draw_id == draw_id).all()

        # for문을 돌면서 results로 가져온 결과들을 정리
        res = _organize_result(results=results, randword=randword)
        # 반환
        return (res, 200)


@ns.route("/api/v1/draws/results/multi", methods=['POST'])
class multiresults(Resource):
    def post(self):
        '''AI가 분석한 결과를 가져온다(1인)'''
        value = request.get_json()
        # task_id(list 형태) game_id 받기
        task_ids = value['task-id']
        user_num = len(task_ids)
        game = db.session.query(models.Game).get(value['game-id'])
        if game is None:
            return('Can not access data', 400)
        randword = game.random_word
        # task_id들로 task가 완료되었는지 while문을 돌며 check
        while (_is_complete(task_ids) == "WAIT"):
            time.sleep(1.0)
        if self._is_complete(task_ids) == "FAIL":
            return ("Get result fail", 200)
        # task가 다 완료되었다면 result 받아오기
        results = db.session.query(models.Result).filter(
            models.Result.game_id == game.id).all()
        if results is None:
            return('Can not access data', 400)
        # for문을 돌면서 results로 가져온 결과들을 정리
        res = {}
        res_list = []
        # draw-id가 같은 result끼리 분류
        result_list = [[] for _ in range(user_num)]
        for result in results:
            result_list[result.draw.draw_no - 1].append(result)
        # 이제 result 조회해서 가져오기
        for results in result_list:
            user_res = _organize_result(results=results, randword=randword)
            user_res['draw-no'] = results[0].draw.draw_no
            user_res['task-id'] = task_ids[user_res['draw-no'] - 1]
            res_list.append(user_res)

        res_list = sorted(
            res_list, key=lambda d: d['randword']['similarity'], reverse=True)
        res['res'] = res_list
        # 반환
        return (res, 200)


if __name__=="__main__":
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)   
    app.run(port="5000", debug=True)
