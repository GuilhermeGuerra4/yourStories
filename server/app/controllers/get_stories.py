from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from flask import request
import json

preview_size = 10
page_size = 10

@app.route('/get_stories', methods=['POST'])
def get_stories():
	response = {'status': False, 'message': ''}
	
	if not 'token' in request.form:
		response['message'] = 'bad request'
	else:
		page = int(request.form['page']) if 'page' in request.form else 1
		token = request.form['token']
		is_signed = verify_login(token)

		if is_signed == False:
			response['message'] = 'not authentificated'
		else:
			fetch = Story.query.filter_by(status='published').with_entities(Story.id, Story.title, Story.preview).order_by(Story.datetime_created.desc()).paginate(per_page=page_size, page=page)
			response['status'] = True
			response['message'] = 'ok'
			response['size'] = len(fetch.items)
			response['payload'] = fetch.items


	return(json.dumps(response))
