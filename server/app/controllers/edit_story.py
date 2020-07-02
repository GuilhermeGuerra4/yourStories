from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json

preview_size = 10

@app.route('/edit_story', methods=['PUT'])
def edit_story():
	response = {'status': False, 'message': ''}
	if not 'token' in request.form or \
		not 'id' in request.form or \
		not 'title' in request.form or \
		not 'text' in request.form or \
		not 'tags' in request.form:
		response['message'] = 'bad request'
	else:
		token = request.form['token']
		story_id = int(request.form['id'])
		title = request.form['title']
		text = request.form['text']
		tags = request.form['tags']
		is_signed = verify_login(token)
		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			user = get_user_by_token(token)
			Story.query.filter_by(id=story_id, publisher_id=user.id) \
				.update({Story.title: title, Story.text:text, Story.tags: tags,Story.preview:text[:preview_size]})
			db.session.commit()
			response['status'] = True
			response['message'] = 'story edited'
	return(json.dumps(response))