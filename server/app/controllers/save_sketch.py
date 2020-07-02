from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json, time

preview_size = 10

@app.route('/save_sketch', methods=['PUT'])
def save_sketch():
	response = {'status': False, 'message': ''}
	
	if not 'token' in request.form or not 'text' in request.form:
		response['message'] = 'bad request'
	else:
		text = request.form['text']
		token = request.form['token']
		is_signed = verify_login(token)

		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			user = get_user_by_token(token)
			story = Story.query.filter_by(publisher_id=user.id, status='in_sketch').with_entities(Story.id, Story.title, Story.text).first()
			response['status'] = True
			if story == None:
				timestamp_now = str(time.time())
				new_story = Story(id=False, title="", text=text, preview=text[:preview_size], tags="", datetime_created=timestamp_now, last_update=timestamp_now, status="in_sketch", publisher_id=user.id)
				db.session.add(new_story)
				response['message'] = 'story created'
			else:
				db.session.query(Story).filter(Story.id == story.id).update({Story.text:text, Story.preview:text[:preview_size]})
				response['message'] = 'story saved'
			db.session.commit()

	return(json.dumps(response))