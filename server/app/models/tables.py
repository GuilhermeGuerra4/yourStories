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

class Story(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(100), nullable=False)
	text = db.Column(db.Text, nullable=False)
	tags = db.Column(db.Text(200), nullable=True)
	datetime_created = db.Column(db.BIGINT, nullable=False)
	last_update = db.Column(db.BIGINT, nullable=False)
	publisher_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Like(db.Model):
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)
	datetime = db.Column(db.BIGINT, nullable=False)

class Comment(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	commenter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)
	comment = db.Column(db.String(500), nullable=False)

class Comment_reply(db.Model):
	commenter_id = db.Column(db.Integer, nullable=False, db.ForeignKey('user.id'))
	story_id = db.Column(db.Integer, nullable=False, db.ForeignKey('story.id'))
	comment_id = db.Column(db.Integer, nullable=False, db.ForeignKey('comment.id'))
	comment = db.Column(db.String(500), nullable=False)

class View(db.Model):
	user_id = db.Column(db.Integer, nullable=False, db.ForeignKey('user.id'))
	story_id = db.Column(db.Integer, nullable=False, db.ForeignKey('story.id'))
	duration = db.Column(db.BIGINT, nullable=False)
	datetime = db.Column(db.DateTime, nullable=False)

class Access(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	user_id = db.Column(db.Integer, nullable=False, db.ForeignKey('user.id'))
	ip = db.Column(db.String(50), nullable=False)
	user_agent = db.Column(db.String(50), nullable=True)
	datetime = db.Column(db.BIGINT, nullable=False)