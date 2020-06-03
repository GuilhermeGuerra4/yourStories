from __main__ import app
from app.db import db
from app.models.tables import User
from flask import request
from app.functions.auth_help import token_generator
import json, requests, time


endpoint = app.config['GOOGLE_API_ENDPOINT']

@app.route('/signin', methods=['POST'])
def signin():
	response = {'status': False, 'message': ''}
	if not 'token' in request.form: 
		response['message'] = 'bad request'
	else:
		google_token = request.form['token']
		google_request = requests.get(endpoint+google_token)
		if google_request.status_code != 200:
			response['message'] = 'invalid token'
		else:
			response['status'] = True
			response['message'] = "ok"
			user = google_request.json()
			is_in_db = User.query.filter_by(google_id=user['sub']).count()
			if is_in_db == 0:
				new_token = token_generator(user['email'])
				response['payload'] = new_token
				current_timestamp = str(time.time())
				new_user = User(id = False,
								token = new_token,
								google_id = user['sub'],
								full_name = user['name'],
								email = user['email'],
								birthdate = '0000-00-00',
								photo = user['picture'],
								locale = user['locale'],
								ip = request.remote_addr,
								datetime_created_account = current_timestamp,
								last_datetime_online = current_timestamp,
								)

				db.session.add(new_user)
				db.session.commit()
			else:
				user = User.query.filter_by(google_id=user['sub']).first()
				if user != None:
					response['payload'] = {'token':user.token}
					
	return(json.dumps(response))
