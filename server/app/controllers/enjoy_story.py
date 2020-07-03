from __main__ import app
from app.db import db
from app.models.tables import User, Story, Enjoy
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json, time

@app.route('/enjoy_story', methods=['POST'])
def enjoy_story():
	response = {'status': False, 'message': ''}
	if not 'token' in request.form or not 'story_id' in request.form:
		response['message'] = 'bad request'
	else:
		token = request.form['token']
		story_id = int(request.form['story_id'])
		is_signed = verify_login(token)
		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			story = Story.query.filter_by(id=story_id).count()
			if story == 0:
				response['message'] = 'story not found'
			else:
				has_already_enjoyed_post = Enjoy.query.filter_by(story_id=story_id).count()
				user = get_user_by_token(token)
				if has_already_enjoyed_post == 1:
					enjoy = Enjoy.query.filter_by(user_id=user.id, story_id=story_id).delete()
					response['message'] = 'enjoy removed'
				else:
					enjoy = Enjoy(story_id=story_id, user_id=user.id, datetime=str(time.time()))
					db.session.add(enjoy)
					response['message'] = 'enjoy added'
				db.session.commit()
				response['status'] = True
	return(json.dumps(response))