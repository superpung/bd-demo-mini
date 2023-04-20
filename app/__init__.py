# -*- coding: utf-8 -*-

import os

from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

os.environ['PYTHONUNBUFFERED '] = '1'

if not os.path.exists('temp'):
    os.mkdir('temp')
if not os.path.exists('temp/dataset'):
    os.mkdir('temp/dataset')
if not os.path.exists('temp/embed'):
    os.mkdir('temp/embed')
if not os.path.exists('temp/log'):
    os.mkdir('temp/log')

app = Flask(__name__)
CORS(app, resources=r'/*')

app.secret_key = str("abcdefghijklmnopqrstuvwx")
app.config['JSON_AS_ASCII'] = False
app.config['UPLOAD_FOLDER'] = 'temp'
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.mkdir(app.config['UPLOAD_FOLDER'])
socket = SocketIO(app, async_mode='threading')

from .api import api as api_blueprint
from .service import service as service_blueprint

app.register_blueprint(service_blueprint)

app.register_blueprint(api_blueprint, url_prefix="/api")
