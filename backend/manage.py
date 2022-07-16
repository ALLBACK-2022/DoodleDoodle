import os
from app import create_app
from app import db
from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from app_utils import config

app = create_app(os.getenv('TYPE', 'default'))
host = config.get_yaml('app.HOST')
port = config.get_yaml('app.POST')

manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command('runserver', Server(host=host, port=port))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
