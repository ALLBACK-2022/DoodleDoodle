from flask_sqlalchemy import SQLAlchemy
import datetime, os
from flask import Flask
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()
db = SQLAlchemy()
MYSQL_ROOT_PASSWORD=os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_HOST=os.environ.get("MYSQL_HOST")
sqlurl = 'mysql+pymysql://root:' + MYSQL_ROOT_PASSWORD + '@' + MYSQL_HOST + ':3306/DoodleDoodle'
Base = declarative_base()
engine = create_engine(sqlurl)
app.config['SQLALCHEMY_DATABASE_URI'] = sqlurl
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


class Game(Base):
    __tablename__ = 'game'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    random_word = db.Column(db.String(20))
    player_num = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    draws = db.relationship('Draw', backref='game', lazy='dynamic')
    
    
    def __init__(self, random_word, player_num):
        self.random_word = random_word
        self.player_num = player_num
        self.created_at = datetime.datetime.now().replace(microsecond=0)
        self.updated_at = self.created_at
        
        
<<<<<<< HEAD
    def serialize(self):
        return {
        "id" : self.id,
        "random_word" : self.random_word,
        "created_at" : str(self.created_at),
        "user_num" : self.user_num,
        "updated_at" : str(self.updated_at)
    }

=======
    def set_updated_at(self):
        self.updated_at = datetime.datetime.now().replace(microsecond=0)
>>>>>>> docker
        
    
    def serialize(self):
        return {
        "id" : self.id,
        "random_word" : self.random_word,
        "player_num" : self.player_num,
        "created_at" : str(self.created_at),
        "updated_at" : str(self.updated_at)
    }


class Draw(Base):
    __tablename__ = 'draw'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    draw_no = db.Column(db.Integer)
    doodle = db.Column(db.Text)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    game_id = db.Column(db.Integer, db.ForeignKey(Game.id))
    user_id = db.relationship('Result', backref='draw', lazy='dynamic')


    def __init__(self, draw_no, doodle):
        self.draw_no = draw_no
        self.doodle = doodle
        self.created_at = datetime.datetime.now().replace(microsecond=0)
        self.updated_at = self.created_at
        
        

        

class Word(Base):
    __tablename__ = 'word'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    eng_name = db.Column(db.String(50))
    img_url = db.Column(db.Text)
    word_id = db.relationship('Result', backref='word', lazy='dynamic')
    
    
    def __init__(self, name, eng_name, img_url):
        self.name = name
        self.eng_name = eng_name
        self.img_url = img_url
        self.created_at = datetime.datetime.now().replace(microsecond=0)
        self.updated_at = self.created_at
        
    

    def serialize(self):
        return {
            "id" : self.id,
            "name" : self.name,
            "img_url" : self.img_url
        }


class Result(Base):
    __tablename__ = 'result'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.Integer, primary_key=True)
    similarity = db.Column(db.Float)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey(Draw.id))
    word_id = db.Column(db.Integer, db.ForeignKey(Word.id))
    
    
    def __init__(self, similarity):
        self.similarity = similarity
        self.created_at = datetime.datetime.now().replace(microsecond=0)
        self.updated_at = self.created_at
        
        


Base.metadata.create_all(engine)
