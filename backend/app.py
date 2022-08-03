from flask import Flask, request, Response
from fileinput import filename
import time
from flask import Flask, jsonify, request
from flask_restx import Resource, Api
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from connection import s3_connection, s3_put_object, s3_get_image_url
from config import BUCKET_NAME, BUCKET_REGION
import os, models, random, logging, requests, datetime

from models import db
from flask_migrate import Migrate
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy import and_

app = Flask(__name__)
load_dotenv()
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
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
app.config['CORS_HEADERS'] = 'Content-Type'

ns = api.namespace('/', description='DoodleDoodle API')
parser = ns.parser()
file_parser = ns.parser()
result_parser = ns.parser()

db = SQLAlchemy(app)
s3 = s3_connection()
random.seed(random.randint(0, 300))

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


def _organize_result(results, doodle):
    res, topfive = {}, []
    res['doodle'] = doodle
    for result in results:
        word = {}
        word['dictionary'] = result.dictionary.serialize()
        word['similarity'] = result.similarity
        # if result.dictionary.name == randword:
        #     res['randword'] = word
        topfive.append(word)
    if(len(topfive) > 5):
        for i in range(0, 5):
            for j in range(1, 6):
                if i != j and topfive[i]['dictionary']['name'] == topfive[j]['dictionary']['name']:
                    word['randword'] = topfive.pop(i)
                    break
            if len(topfive) == 5:
                break
    res['topfive'] = topfive
    if results:
        res['draw-id'] = results[0].draw_id
    res['topfive'] = sorted(
        res['topfive'], key=lambda d: d['similarity'], reverse=True)
    return res


@ns.route("/", methods=['GET'])
# 
class main_page(Resource):

    def get(self):
        # request.headers.get('Access-Control-Allow-Origin')
        # request.headers.get('Access-Control-Allow-Methods')
        # request.headers.get('Access-Control-Allow-Headers')
        # request.headers.get('Content-type')
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


# def build_actual_response(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response


@ns.route("/api/v1/randwords", methods=['GET', 'POST'])
class randwords(Resource):

    def _translate_word(self, aranword):
        '''한글단어를 영어로 변환한다'''
        row = db.session.query(models.Dictionary).filter(
            models.Dictionary.name == aranword).first()
        db.session.commit()
        englishword = row.eng_name
        return englishword

    def get(self):
        '''랜덤으로 단어를 가져온다'''
        randword = db.session.query(models.Dictionary).filter(
            models.Dictionary.id == random.randint(1, 99))
        if randword.first() is None:
            return ('Can not access data', 400)
        return (randword[0].name, 200)

    def post(self):
        '''최종결정한 단어를 저장한다'''
        request.headers.get('Access-Control-Allow-Origin')
        request.headers.get('Access-Control-Allow-Methods')
        request.headers.get('Access-Control-Allow-Headers')
        request.headers.get('Content-type')
        value = request.get_json()
        if not value:
            return('no word found', 400)
        selectgame = db.session.query(models.Game).filter(
            models.Game.id == value['id']).first()
        selectgame.random_word = value['name']
        db.session.commit()
        transword = self._translate_word(value['name'])
        rep =  {"engName": transword}
        if rep is None:
            return ('no word found', 400)
        return (rep, 201)


@ns.route("/api/v1/draws", methods=['POST'])

class save(Resource):

    def post(self):
        '''사용자가 그린 그림을 저장한다'''
        #미리 draw table에 row 추가 
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
        #s3 버킷에 파일 업로드
        f = request.files['filename']
        f.save('temp/' + str(drawid) + '.png')
        retPut = s3_put_object(
            s3, BUCKET_NAME, 'temp/' + str(drawid) + '.png', 'drawimage/' + str(drawid) + '.png')
        os.remove('temp/' + str(drawid) + '.png')
        gameid = value['game-id']
        game = db.session.query(models.Game).get(gameid)
        if game is None:
            return ('Can not access data', 400)
        ranword = game.random_word
        if retPut is None:
            return('Draw saved fail', 400)
        retGet = s3_get_image_url(s3, 'drawimage/' + str(drawid) + '.png')
        ret.doodle = retGet
        db.session.commit()
        retdata = {"draw_id": drawid}
        try:
            return retdata, 200
        except:
            return('Requset to AI fail', 400)


# @ns.route("/api/v1/results/draw/<int:drawid>", methods=['GET'])
# 
# class draw(Resource):

#     def get(self, drawid):
#         '''게임id가 같은 사용자 전체의 그림을 불러온다'''
#         ret = db.session.query(models.Draw).filter(
#             models.Draw.id == drawid).first()
#         retimage = ret.doodle
#         if ret is None:
#             return('NO image in database', 400)
#         db.session.commit()
#         return(retimage, 200)


@ns.route("/api/v1/results/draw/<int:drawid>", methods=['GET'])

class newsingleresult(Resource):
    '''사용자가 그렸던 그림을 불러온다. + 1인용 결과페이지 + 개인 결과 페이지(new)'''
    def get(self, drawid):
        results = db.session.query(models.Result).filter(
            models.Result.draw_id == drawid).all()
        doodle = db.session.query(models.Draw).filter(
            models.Draw.id == drawid).first().doodle
        res = _organize_result(results=results, doodle=doodle)
        if res is None:
            return ("Can not access data", 400)
        return (res, 200)


@ns.route("/api/v1/results/game/<int:gameid>", methods=['GET'])

class game(Resource):
    def get(self, gameid):
        '''ai가 분석한 결과를 가져온다(다인)'''
        game = db.session.query(models.Game).get(gameid)
        randword = game.random_word
        row = db.session.query(models.Dictionary).filter(models.Dictionary.name == randword).first()
        dictnum = row.id
        #results = db.session.query(models.Result).filter(models.Result.game_id == gameid).filter(models.Result.dictionary_id == dictnum).all()
        results = db.session.query(models.Result).filter(and_(models.Result.game_id == gameid, models.Result.dictionary_id == dictnum)).all() 
        #[<results('id', 'similarity','created_at','updated_at','draw_id','dictionary_id','game_id')>,<results('id', 'similarity','created_at','updated_at','draw_id','dictionary_id','game_id')>]
        if results is None:
            return('Can not access data', 400)
        # ret = {} #리턴할 최종 json
        #a = { "randword": randword } 
        x = {}
        res_list = []
        print(results)
        for result in results:
            x = {"draw-id":result.draw_id , "draw_no":result.draw.draw_no, "img_url": result.draw.doodle, "similarity":result.similarity}
            res_list.append(x)      #그린 그림에 대한 정보만 담겨있는 딕셔너리
            #print(result)
        
        res_list = sorted(res_list, key=lambda d: d['similarity'], reverse=True) # 유사도로 내림차순 정렬
        #b = {"users":res_list}           #key값을 user로 가지고 value를 res_list로 가짐 
        ret = {}
        ret['randword'] = randword
        ret['users'] = res_list
        return(ret, 200)

@ns.route("/api/v1/game-result", methods=['POST'])

class game_result(Resource):
    '''프런트가 ai한테 받은 결과값을 백엔드로 보내준다(new)'''
    def post(self):
        request.headers.get('Access-Control-Allow-Origin')
        request.headers.get('Access-Control-Allow-Methods')
        request.headers.get('Access-Control-Allow-Headers')
        request.headers.get('Content-type')
        value = request.get_json()
        draw_id = value['draw-id']
        top_five = value['top-five']
        randword = value['randword']['result']
        now = datetime.datetime.now().replace(microsecond=0)
        print(list(randword.keys())[0])
        if draw_id is None or top_five is None or randword is None:
            return("Can not find request data", 400)
        game_id = db.session.query(models.Draw).filter(
            models.Draw.id == draw_id).first().game_id
        dictionary_id = db.session.query(models.Dictionary).filter(
            models.Dictionary.eng_name == list(randword.keys())[0]).first().id
        row = models.Result(similarity=randword[list(randword.keys())[0]], draw_id=draw_id, dictionary_id=dictionary_id, game_id=game_id)
        db.session.add(row)
        for result in top_five:
            print(result)
            name = db.session.query(models.Game).filter(
                models.Game.id == game_id).first().random_word
            dictionary_id = db.session.query(models.Dictionary).filter(
                models.Dictionary.name == name).first().id
            row = models.Result(similarity=list(result.values())[0], draw_id=draw_id, dictionary_id=dictionary_id, game_id=game_id)
            db.session.add(row)
        db.session.commit()
        return ("save success", 200)

# @ns.route("/api/v1/game-result", methods=['POST'])
# class game_result(Resource):
#     '''프런트가 ai한테 받은 결과값을 백엔드로 보내준다(new)'''
#     def post(self):
#         value = request.get_json()
#         draw_id = value['draw-id']
#         top_five = value['top-five']
#         if draw_id is None or top_five is None:
#             return("Can not find request data", 400)
#         for idx, result in enumerate(top_five):
#             now = datetime.datetime.now().replace(microsecond=0)
#             game_id = db.session.query(models.Draw).filter(
#                 models.Draw.id == draw_id).first().game_id
#             name = db.session.query(models.Game).filter(
#                 models.Game.id == game_id).first().random_word
#             dictionary_id = db.session.query(models.Dicionary).filter(
#                 models.Dictionary.name == name).first().id
#             row = models.Result(similarity=top_five[result.keys()[idx]], draw_id=draw_id, dictionary_id=dictionary_id, game_id=game_id,
#                 created_at=now, updated_at=now)
#             db.session.add(row)
#         db.session.commit()
#         return ("save success", 200)


        
# @ns.route("/api/v1/draws/results/single", methods=['POST'])
# 
# class singleresult(Resource):
#     def post(self):      
#         '''AI가 분석한 결과를 가져온다(다인)'''
#         value = request.get_json()
#         print(value)
#         # task_id(list 형태) game_id 받기
#         task_id = value['task-id']
#         draw_id = value['draw-id']
#         game = db.session.query(models.Game).get(value['game-id'])
#         if game is None:
#             return('Can not access data', 400)
#         randword = game.random_word
#         # task_id를 AI 서버로 전달해 task가 완료되었는지 확인 요청
#         data = {'task-id': task_id}
#         response = _request_taskcheck(data)
#         if response == "FAIL":
#             return('AI fail', 400)
#         if response == "TIME_OUT":
#             return('AI time out', 400)
#         # task가 다 완료되었다면 result 받아오기
#         results = db.session.query(models.Result).filter(
#             models.Result.draw_id == draw_id).all()
#         # for문을 돌면서 results로 가져온 결과들을 정리
#         res = _organize_result(results, randword)
#         # 반환
#         return (res, 200)


# @ns.route("/api/v1/draws/results/multi", methods=['POST'])
# 
# class multiresults(Resource):
#     def post(self):
#         print('here post')
#         '''AI가 분석한 결과를 가져온다(1인)'''
#         value = request.get_json()
#         print(value)
#         # task_id(list 형태) game_id 받기
#         task_id = value['task-id']
#         user_num = len(task_id)
#         game = db.session.query(models.Game).get(value['game-id'])
#         if game is None:
#             return('Can not access data', 400)
#         randword = game.random_word
#         # task_id를 AI 서버로 전달해 task가 완료되었는지 확인 요청
#         data = {'task-id': task_id}
#         response = _request_taskcheck(data)
#         if response == "FAIL":
#             return('AI fail', 400)
#         if response == "TIME_OUT":
#             return('AI time out', 400)
#         # task가 다 완료되었다면 result 받아오기
#         results = db.session.query(models.Result).filter(
#             models.Result.game_id == game.id).all()
#         if results is None:
#             return('Can not access data', 400)
#         # for문을 돌면서 results로 가져온 결과들을 정리
#         res = {}
#         res_list = []
#         # draw-id가 같은 result끼리 분류
#         result_list = [[] for _ in range(user_num)]
#         for result in results:
#             result_list[result.draw.draw_no - 1].append(result)
#         # 이제 result 조회해서 가져오기
#         print('result_list', result_list)
#         for results in result_list:
#             print('results', results)
#             user_res = _organize_result(results, randword)
#             if results:
#                 user_res['draw-no'] = results[0].draw.draw_no
#             user_res['task-id'] = task_id[user_res['draw-no'] - 1]
#             res_list.append(user_res)

#         res_list = sorted(
#             res_list, key=lambda d: d['randword']['similarity'], reverse=True)
#         res['res'] = res_list
#         # 반환
#         return (res, 200)


if __name__ == "__main__":
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
    app.run(port=5000, debug=True)
