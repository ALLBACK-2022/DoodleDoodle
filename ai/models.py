from flask_sqlalchemy import SQLAlchemy
import datetime, os, pymysql
from flask import Flask
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()
db = SQLAlchemy()
db.init_app(app)
MYSQL_ROOT_PASSWORD=os.environ.get("MYSQL_ROOT_PASSWORD")
MYSQL_HOST=os.environ.get("MYSQL_HOST")
sqlurl = 'mysql+pymysql://root:' + MYSQL_ROOT_PASSWORD + '@' + MYSQL_HOST + ':3306/DoodleDoodle'
Base = declarative_base()
engine = create_engine(sqlurl)
app.config['SQLALCHEMY_DATABASE_URI'] = sqlurl
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
Base.metadata.reflect(engine)

class Result(Base):
    __table__ = Base.metadata.tables['result']
    
class Game(Base):
    __table__ = Base.metadata.tables['game']
    
class Dictionary(Base):
    __table__ = Base.metadata.tables['dictionary']

class Draw(Base):
    __table__ = Base.metadata.tables['draw']
