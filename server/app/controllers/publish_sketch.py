from __main__ import app
from app.db import db
from app.models.tables import User, Story
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json, time


@app.route('/publish_sketch', methods=['POST'])
def publish_sketch():
	response = {'status':False, 'message':''}
	if not 'token' in request.form or not 'title' in request.form or not 'tags' in request.form or not 'id' in request.form:
		response['message'] = 'bad request'
	else:
		id = int(request.form['id'])
		token = str(request.form['token'])
		title = str(request.form['title'])
		tags = str(request.form['tags'])
		is_signed = verify_login(token)
		
		if is_signed == False:
			response['message'] = 'not authentificated'
		else:

			user = get_user_by_token(token)
			story = Story.query.filter_by(id=id, publisher_id=user.id, status='in_sketch').count()

			if story == 0:
				response['message'] = 'invalid story id'
			else:
				response['status'] = True
				response['message'] = 'ok'
				timestamp_now = str(time.time())
				db.session.query(Story).filter(Story.id == id).update({Story.title: title, Story.title: title, Story.tags: tags,Story.datetime_created: timestamp_now,Story.last_update: timestamp_now,Story.status: 'published'})
				db.session.commit()

	return json.dumps(response)