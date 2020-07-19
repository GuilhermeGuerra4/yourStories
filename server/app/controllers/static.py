from __main__ import app
from flask import send_from_directory

@app.route('/static/<path>', methods=['GET'])
def get_static(path):
	return send_from_directory('app/static', path)
