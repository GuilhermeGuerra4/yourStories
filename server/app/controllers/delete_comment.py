from __main__ import app
from app.db import db
from app.models.tables import User, Story, Comment, Comment_reply
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json, time

@app.route('/delete_comment', methods=['DELETE'])
def delete_comment():
	response = {'status': True, 'message': ''};
	if not 'token' in request.form or not 'comment_id' in request.form:
		response['message'] = 'bad request'
	else:
		token = request.form['token']
		comment_id = int(request.form['comment_id'])
		is_signed = verify_login(token)
		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			user = get_user_by_token(token)
			comment = Comment.query.filter_by(id=comment_id, commenter_id=user.id)
			if comment.count() == 0:
				response['message'] = 'comment_id invalid'
			else:
				comment.update({Comment.status: 'excluded'})
				db.session.commit()
				response['message'] = 'ok'
				response['status'] = True
	return(json.dumps(response))