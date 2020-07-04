from __main__ import app
from app.db import db
from app.models.tables import Access
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json, time

@app.route('/add_access', methods=['POST'])
def add_access():
	response = {'status': False, 'message': ''};
	if not 'token' in request.form or not 'device' in request.form:
		response['message'] = 'bad request'
	else:
		token = request.form['token']
		device = request.form['device']
		is_signed = verify_login(token)
		if is_signed == False:
			response['message'] = 'not authorized'
		else:
			user = get_user_by_token(token)
			currentTime = 1593981616
			access = Access.query.filter(Access.user_id==user.id, Access.datetime.between(currentTime - 86400, currentTime + 86400))
			if access.count() == 0:
				response['message'] = 'ok'
				response['status'] = True
				new_access = Access(user_id=user.id, ip=request.remote_addr, user_agent=device, datetime=currentTime)
				db.session.add(new_access)
				db.session.commit()
			else:
				response['message'] = 'already registed today'
	return(json.dumps(response))