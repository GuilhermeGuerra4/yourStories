from app.db import db
from app.models.tables import User
import time

def get_user_by_token(token):
	query = User.query.filter_by(token=token).first()
	return query


def update_last_time_online(token):
	db.session.query(User).filter(User.token == token).update({User.last_datetime_online})
	db.session.commit()