from __main__ import app
from app.db import db
from app.models.tables import User
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json, time

@app.route('/add_push_token', methods=['POST'])
def add_push_token():
	response = {'status': False, 'message': ''};
	if not 'token' in request.form or not 'push_token' in request.form:
		print(request.form)
		response['message'] = 'bad request'
	else:
		token = request.form['token']
		push_token = request.form['push_token']
		is_signed = verify_login(token)
		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			user = get_user_by_token(token)
			db.session.query(User).filter(User.id == user.id).update({'push_token': push_token})
			db.session.commit()
			response['status'] = True
			response['message'] = 'ok'
			
	return(json.dumps(response))