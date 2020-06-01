from __main__ import app
from app.db import db
from app.models.tables import Users


@app.route('/get_stories', methods=['GET'])
def get_stories():
	return("")
