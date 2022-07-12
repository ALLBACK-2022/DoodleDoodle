from flask import Flask, jsonify, request
from flask_restx import Resource, Api
from dotenv import load_dotenv
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os, models
import sqlalchemy

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
sqlurl = 'mysql+pymysql://root:' + MYSQL_ROOT_PASSWORD + '@' + MYSQL_HOST + ':3300/DoodleDoodle'

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


@ns.route("/", methods=['GET'])
class main_page(Resource):
    def get(self):
        return 'Doodle, Doodle!'


@ns.route("/user-num", methods=['POST'])
class user_num(Resource):
    def post(self):
        value = request.get_json()
        print(value)
        if value['user-num'] > 6:
            return ('too many users', 200)
        row = models.Game(random_word="", user_num=value['user-num'])
        db.session.add(row)
        db.session.commit()
        return ('user-num created successfully', 201)


if __name__=="__main__":
    app.run(port="5000", debug=True)
  
