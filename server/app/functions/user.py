from app.db import db
from app.models.tables import User

def get_user_by_token(token):
	query = User.query.filter_by(token=token).first()
	return query


