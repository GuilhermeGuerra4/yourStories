from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json

@app.route('/get_sketch', methods=['POST'])
def get_sketch():
	response = {'status': False, 'message': ''}
	
	if not 'token' in request.form:
		response['message'] = 'bad request'
	else:
		token = request.form['token']
		is_signed = verify_login(token)

		if is_signed == False:
			response['message'] = 'not authentificated'
		else:
			user = get_user_by_token(token)
			story = Story.query.filter_by(publisher_id=user.id, status='in_sketch').with_entities(Story.id, Story.title, Story.text).first()
			
			if story == None:
				response['message'] = 'none sketch created yet'
			else:
				response['status'] = True
				response['message'] = 'ok'
				response['payload'] = story

	return(json.dumps(response))