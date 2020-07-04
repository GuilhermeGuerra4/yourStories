from flask import Flask, send_from_directory
from app import *

app = Flask(__name__)
app.config.from_pyfile('config.py')
from app.controllers import get_stories,get_my_stories,edit_story,get_story,enjoy_story,delete_story
from app.controllers import signin, add_access
from app.controllers import get_comments, add_comment, delete_comment
from app.controllers import get_sketch, save_sketch, publish_sketch
app.run(host="0.0.0.0", port=3000, debug=True)