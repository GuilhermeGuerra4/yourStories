from app.db import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	token = db.Column(db.String(80), unique=True, nullable=False)
	google_id = db.Column(db.String(500), unique=True, nullable=False)
	full_name = db.Column(db.String(50), nullable=False)
	email = db.Column(db.String(50), nullable=False)
	birthdate = db.Column(db.Date(), nullable=True)
	photo = db.Column(db.String(500), nullable=False)
	locale = db.Column(db.String(5), nullable=False)
	ip = db.Column(db.String(20), nullable=False)
	datetime_created_account = db.Column(db.BIGINT, nullable=False)
	last_datetime_online =  db.Column(db.BIGINT, nullable=False) 

class Story(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(100), nullable=True)
	text = db.Column(db.String, nullable=False)
	preview = db.Column(db.Text, nullable=False)
	tags = db.Column(db.Text(200), nullable=True)
	datetime_created = db.Column(db.BIGINT, nullable=True)
	last_update = db.Column(db.BIGINT, nullable=False)
	status = db.Column(db.Enum('in_sketch', 'published', 'excluded', 'banned'))
	publisher_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Like(db.Model):
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
	story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False, primary_key=True)
	datetime = db.Column(db.BIGINT, nullable=False)

class Comment(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	commenter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)
	comment = db.Column(db.String(500), nullable=False)

class Comment_reply(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	commenter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)
	comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'), nullable=False)
	comment = db.Column(db.String(500), nullable=False)

class View(db.Model):
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
	story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False, primary_key=True)
	duration = db.Column(db.BIGINT, nullable=False)
	datetime = db.Column(db.DateTime, nullable=False)

class Access(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	ip = db.Column(db.String(50), nullable=False)
	user_agent = db.Column(db.String(50), nullable=True)
	datetime = db.Column(db.BIGINT, nullable=False)