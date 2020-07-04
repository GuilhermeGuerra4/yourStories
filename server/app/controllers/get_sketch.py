from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json

@app.route('/get_sketch/<token>/', methods=['GET'])
def get_sketch(token=None):
	response = {'status': False, 'message': ''}
	
	if token == None:
		response['message'] = 'bad request'
	else:
		is_signed = verify_login(token)

		if is_signed == False:
			response['message'] = 'not authentificated'
		else:
			user = get_user_by_token(token)
			story = Story.query.filter_by(publisher_id=user.id, status='in_sketch') \
				.with_entities(Story.id, Story.title, Story.text).first()
			
			if story == None:
				response['message'] = 'none sketch created yet'
			else:
				response['status'] = True
				response['message'] = 'ok'
				response['payload'] = {"id": story.id, "title": story.title, "text": story.text}

	return(json.dumps(response))