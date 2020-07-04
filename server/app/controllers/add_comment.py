from __main__ import app
from app.db import db
from app.models.tables import User, Story, Comment, Comment_reply
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json, time

@app.route('/add_comment', methods=['POST'])
def add_comment():
	response = {'status': False, 'message': ''};
	if not 'token' in request.form\
		or not 'story_id' in request.form\
		or not 'comment' in request.form:
			response['message'] = 'bad request'
	else:
		token = request.form['token']
		story_id = int(request.form['story_id'])
		comment = request.form['comment']
		is_signed = verify_login(token)

		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			user = get_user_by_token(token)
			story = Story.query.filter_by(id=story_id)
			if story.count() == 0:
				response['message'] = 'invalid story id'
			else:
				current_time = time.time()
				new_comment = Comment(commenter_id=user.id, story_id=story_id, comment=comment, datetime=current_time, status='published')
				db.session.add(new_comment)
				db.session.commit()
				response['status'] = True
				response['message'] = 'ok'
	return(json.dumps(response))