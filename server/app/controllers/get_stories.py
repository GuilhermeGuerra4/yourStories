from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json

page_size = 10

@app.route('/get_stories/<token>/<page>/', methods=['GET'])
def get_stories(token=None, page=None):
	response = {'status': False, 'message': ''}
	
	if token == None or page == None:
		response['message'] = 'bad request'
	else:
		page = int(page)
		is_signed = verify_login(token)

		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			user = get_user_by_token(token)
			fetch = Story.query.filter(Story.status.like('published'), Story.locale.like('%'+user.locale[:2]+'%')) \
				.with_entities(Story.id, Story.title, Story.preview) \
				.order_by(Story.datetime_created.desc()) \
				.paginate(per_page=page_size, page=page, error_out=False)

			if len(fetch.items) == 0:
				fetch = Story.query.filter(Story.status.like('published'), Story.locale.like('en')) \
				.with_entities(Story.id, Story.title, Story.preview) \
				.order_by(Story.datetime_created.desc()) \
				.paginate(per_page=page_size, page=page, error_out=False)

			data = []

			
			for item in fetch.items:
				data.append({'id': item[0], 'title':item[1], 'preview':item[2]})
			if len(data) > 0:
				response['last_page'] = True if page_size > len(data) else False
				response['status'] = True
				response['message'] = 'ok'
				response['size'] = len(data)
				response['payload'] = data
			else:
				response['status'] = True
				response['message'] = 'ok'
				response['size'] = 0
			

	return(json.dumps(response))
