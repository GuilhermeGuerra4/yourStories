from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json

preview_size = 10
page_size = 10

@app.route('/get_my_stories/<token>/<page>/', methods=['GET'])
def get_my_stories(token=None, page=None):
	response = {'status': False, 'message': ''}
	
	if token == None:
		response['message'] = 'bad request'
	else:
		page = 1 if page == None else int(page)
		is_signed = verify_login(token)

		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			user = get_user_by_token(token)
			fetch = Story.query.filter_by(status='published', publisher_id=user.id) \
				.with_entities(Story.id, Story.title, Story.preview) \
				.order_by(Story.datetime_created.desc()) \
				.paginate(per_page=page_size, page=page) \

			data = []

			for item in fetch.items:
				data.append({'id': item[0], 'title':item[1], 'preview': item[2]})

			response['status'] = True
			response['message'] = 'ok'
			response['size'] = len(data)
			response['payload'] = data

	return(json.dumps(response))
