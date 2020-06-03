from flask import Flask, send_from_directory
from app import *
from app.config import *

app = Flask(__name__)
app.config.from_pyfile('config.py')
from app.controllers import get_stories,signin
from app.controllers import get_sketch, save_sketch
app.run(host="0.0.0.0", port=3000, debug=True)