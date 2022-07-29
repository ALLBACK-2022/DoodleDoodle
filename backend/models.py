from flask_sqlalchemy import SQLAlchemy
import datetime
import os
import pymysql
from flask import Flask
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()
MYSQL_ROOT_PASSWORD=os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_HOST=os.environ.get("MYSQL_HOST")
sqlurl = 'mysql+pymysql://root:' + MYSQL_ROOT_PASSWORD + '@' + MYSQL_HOST + ':3306/DoodleDoodle'
Base = declarative_base()
engine = create_engine(sqlurl)
app.config['SQLALCHEMY_DATABASE_URI'] = sqlurl
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
Base.metadata.reflect(engine)

class Game(Base):
    __tablename__ = 'game'
    __table_args__ = {'extend_existing': True, 'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    random_word = db.Column(db.String(20))
    player_num = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    draw = db.relationship('Draw', backref='game')

    def __init__(self, random_word, player_num):
        self.random_word = random_word
        self.player_num = player_num
        self.created_at = datetime.datetime.now().replace(microsecond=0)
        self.updated_at = self.created_at

    def serialize(self):
        return {
            "id": self.id
        }


class Draw(Base):
    __tablename__ = 'draw'
    __table_args__ = {'extend_existing': True, 'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    draw_no = db.Column(db.Integer)
    doodle = db.Column(db.Text)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    game_id = db.Column(db.Integer, db.ForeignKey(Game.id))
    result = db.relationship('Result', backref='draw')

    def __init__(self, draw_no, doodle, game_id):
        self.draw_no = draw_no
        self.doodle = doodle
        self.game_id = game_id
        self.created_at = datetime.datetime.now().replace(microsecond=0)
        self.updated_at = self.created_at


class Dictionary(Base):
    __tablename__ = 'dictionary'
    __table_args__ = {'extend_existing': True, 'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    eng_name = db.Column(db.String(50))
    img_url = db.Column(db.Text)
    result = db.relationship('Result', backref='dictionary')

    def __init__(self, name, eng_name, img_url):
        self.name = name
        self.eng_name = eng_name
        self.img_url = img_url
        self.created_at = datetime.datetime.now().replace(microsecond=0)
        self.updated_at = self.created_at

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "eng_name": self.eng_name,
            "img_url": self.img_url
        }


class Result(Base):
    __tablename__ = 'result'
    __table_args__ = {'extend_existing': True, 'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    similarity = db.Column(db.Float)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    draw_id = db.Column(db.Integer, db.ForeignKey(Draw.id))
    dictionary_id = db.Column(db.Integer, db.ForeignKey(Dictionary.id))
    game_id = db.Column(db.Integer, db.ForeignKey(Game.id))

    def __init__(self, similarity, draw_id, dictionary_id, game_id):

<<<<<<< develop
        self.similarity = similarity
        # self.draw_id = draw_id
        # self.dictionary_id = dictionary_id
        # self.game_id = game_id 
        self.created_at = datetime.datetime.now().replace(microsecond=0)
        self.updated_at = self.created_at
        
# class Celery_taskmeta(Base):
#     __table__ = Base.metadata.tables['celery_taskmeta']

# class Celery_taskmeta(Base):
#     __tablename__ = Base.metadata.tables['Celery_taskmeta']
#     __table_args__ = {'mysql_collate': 'utf8_general_ci'}

<<<<<<< develop
# class Task(Base):
#     __tablename__ = 'task'
#     __table_args__ = {'mysql_collate': 'utf8_general_ci'}    
#     id = db.Column(db.Integer, primary_key=True)
#     status = db.Column(db.String(20))
#     created_at = db.Column(db.DateTime)
#     updated_at = db.Column(db.DateTime)


#     def __init__(self,status):
#         self.status = status
#         self.created_at = datetime.datetime.now().replace(microsecond=0)
#         self.updated_at = self.created_at

#     def __init__(self,status):
#         self.status = status
#         self.created_at = datetime.datetime.now().replace(microsecond=0)
#         self.updated_at = self.created_at

#     def set_updated_at(self):
#         self.updated_at = datetime.datetime.now().replace(microsecond=0)
=======
class Celery_taskmeta(Base):
    __tablename__ = 'celery_taskmeta'
    __table_args__ = {'mysql_collate': 'utf8mb4_0900_ai_ci'}
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50))
    task_id = db.Column(db.String(155))
>>>>>>> feat: add celery_taskmeta table in models.py, fix restart button


Base.metadata.create_all(engine)
