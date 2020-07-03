from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json

preview_size = 10
page_size = 10

@app.route('/get_stories/<token>/<page>/', methods=['GET'])
def get_stories(token=None, page=None):
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
			print(user.locale[:2])
			fetch = Story.query.filter(Story.status.like('published'), Story.locale.like('%'+user.locale[:2]+'%')) \
				.with_entities(Story.id, Story.title, Story.preview) \
				.order_by(Story.datetime_created.desc()) \
				.paginate(per_page=page_size, page=page)

			response['status'] = True
			response['message'] = 'ok'
			response['size'] = len(fetch.items)
			response['payload'] = fetch.items


	return(json.dumps(response))
