from __main__ import app
from app.db import db
from app.models.tables import User, Comment, Comment_reply
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json, time

@app.route('/get_comments/<token>/<post_id>/', methods=['GET'])
def get_comments(token=None, post_id=None):
	response = {'status': False, 'message': ''};
	if token == None or post_id == None:
		response['message'] = 'bad request'
	else:
		is_signed = verify_login(token)
		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			comments = db.session.query(Comment, User)\
				.with_entities(Comment.id,Comment.commenter_id,Comment.story_id,Comment.comment, User.full_name, User.photo)\
				.filter(Comment.status == 'published', Comment.story_id == post_id, Comment.commenter_id == User.id)\
				.order_by(Comment.datetime.desc())
			comments_array = []
			replies_array = []
			for comm in comments.all():
				comments_array.append({'id': comm[0], 'user_id': comm[1], 'story_id':comm[2], 'comment': comm[3], 'user_fullname': comm[4], 'user_photo': comm[5]})
			response['status'] = True
			response['message'] = 'ok'
			response['payload'] = {'size': len(comments_array), 'data': comments_array}
	return(json.dumps(response))