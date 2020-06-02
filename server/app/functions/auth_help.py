import time
import hashlib
from app.db import db
from app.models.tables import User

def token_generator(user_email):
	salt = '?Dh:|^dRS3IX,#?sVE~di:V"m1-h8;kE4!I*+U~Xa0B048DgNowUPJO09809qwd~A|g_'+str(time.time())
	token = hashlib.sha256((user_email+salt).encode('ascii')).hexdigest()
	return token

def verify_login(token):
	is_in_db = User.query.filter_by(token=token).count()
	if is_in_db > 0:
		return True