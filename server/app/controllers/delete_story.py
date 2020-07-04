from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json, time

@app.route('/delete_story', methods=['DELETE'])
def delete_story():
	response = {'status': True, 'message': ''};
	if not 'token' in request.form or not 'story_id' in request.form:
		response['message'] = 'bad request'
	else:
		token = request.form['token']
		story_id = int(request.form['story_id'])
		is_signed = verify_login(token)
		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			user = get_user_by_token(token)
			story = Story.query.filter_by(id=story_id, publisher_id=user.id)
			if story.count() == 0:
				response['message'] = 'story_id invalid'
			else:
				story.update({Story.status: 'excluded'})
				db.session.commit()
				response['message'] = 'ok'
				response['status'] = True
	return(json.dumps(response))