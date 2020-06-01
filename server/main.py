from flask import Flask
from app import *

app = Flask(__name__)

from app.controllers import get_stories


app.run(host="0.0.0.0", port=3000, debug=True)

