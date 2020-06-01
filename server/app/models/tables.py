from app.db import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	token = db.Column(db.String(80), unique=True, nullable=False)
	full_name = db.Column(db.String(50), nullable=False)
	email = db.Column(db.String(50), nullable=False)
	birthdate = db.Column(db.Date(), nullable=False)
	photo = db.Column(db.String(100), nullable=False)
	locale = db.Column(db.String(5), nullable=False)
	ip = db.Column(db.String(20), nullable=False)
	datetime_created_account = db.Column(db.BIGINT, nullable=False)
	last_datetime_online =  db.Column(db.BIGINT, nullable=False) 
