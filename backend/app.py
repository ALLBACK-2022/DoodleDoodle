from flask import Flask, request, Response
from flask_restx import Resource, Api
from dotenv import load_dotenv
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from connection import s3_connection, s3_put_object, s3_get_image_url
from config import BUCKET_NAME, BUCKET_REGION
import os, models, random, logging
from models import db
from flask_migrate import Migrate
from sqlalchemy_utils import database_exists, create_database


app = Flask(__name__)
load_dotenv()
CORS(app)
api = Api(app)
migrate = Migrate(app, db)

MYSQL_USER=os.environ.get("MYSQL_USER")
MYSQL_PASSWORD=os.environ.get("MYSQL_PASSWORD")
MYSQL_ROOT_PASSWORD=os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_USER=os.environ.get("MYSQL_USER")
MYSQL_DATABASE=os.environ.get("MYSQL_DATABASE")
MYSQL_HOST=os.environ.get("MYSQL_HOST")
MYSQL_PORT=os.environ.get("MYSQL_PORT")
RABBITMQ_DEFAULT_USER=os.environ.get("RABBITMQ_DEFAULT_USER")
RABBITMQ_DEFAULT_PASS=os.environ.get("RABBITMQ_DEFAULT_PASS")
RABBITMQ_DEFAULT_HOST=os.environ.get("RABBITMQ_DEFAULT_HOST")
sqlurl = 'mysql+pymysql://root:' + MYSQL_ROOT_PASSWORD + '@' + MYSQL_HOST + ':3306/DoodleDoodle'
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
    if not database_exists(sqlurl):
        create_database(sqlurl)
    word = db.session.query(models.Dictionary).filter(models.Dictionary.id == 1).first()
    if word is None:
        insert_word()


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
        f.save('temp/'+ str(value['game-id'][0]) + '_' + str(value['draw-no'][0])+'.png')
        ranword = game.random_word
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

@ns.route("/api/v1/draws/results", methods=['POST'])
class result(Resource):
    def _is_complete(self, task_ids):
        # task_id 로 status가 성공인지 아닌지
        for task_id in task_ids:
            task = db.session.query(models.Task).get(task_id)
            if task.status == "FAILURE":
                return "FAIL"
            if not task.status == "SUCCESS":
                return "WAIT"
        return "SUCCESS"

    def _organize_result(self, results, randword):
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
        return res

    def post(self):
        '''AI가 분석한 결과를 가져온다'''
        value = request.get_json()
        # task_id(list 형태) game_id 받기
        task_ids = value['task-id']
        user_num = len(task_ids)
        game = db.session.query(models.Game).get(value['game-id'])
        randword = game.random_word
        # task_id들로 task가 완료되었는지 while문을 돌며 check
        while (self._is_complete(task_ids) == "WAIT"):
            time.sleep(1.0)
        if self._is_complete(task_ids) == "FAIL":
            return ("Get result fail", 200)
        # task가 다 완료되었다면 result 받아오기
        results = db.session.query(models.Result).filter(
            models.Result.game_id == game.id).all()

        # for문을 돌면서 results로 가져온 결과들을 정리
        res = {}
        if user_num == 1:
            res = self._organize_result(results, randword)
        else:
            res_list = []
            # draw-id가 같은 result끼리 분류
            result_list = [[] for _ in range(user_num)]
            for result in results:
                result_list[result.draw_id - 1].append(result)
            # 이제 result 조회해서 가져오기
            for results in result_list:
                user_res = self._organize_result(results, randword)
                user_res['draw-no'] = results[0].draw.draw_no
                res_list.append(user_res)
            res['res'] = res_list
        # 반환
        return (res, 200)

@app.route("/random_status")
def random_status():
    status_code = random.choice([200] * 6 + [300, 400, 400, 500])
    return Response("random status", status=status_code)

if __name__=="__main__":
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)   
    app.run(port="5000", debug=True)
