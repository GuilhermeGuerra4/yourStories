from __main__ import app
from app.db import db
from app.models.tables import Users


@app.route('/get_stories', methods=['GET'])
def get_stories():

	ab = Users.query.filter_by(email="1").order_by(Users.id.desc()).paginate(2, per_page=1)
	print(ab.items)
	return "<h1>Hei<h1>"




"""
tables{
	users{
		id, token, full_name, email, birthdate, photo, locale, ip, datetime_created_account, last_datetime_online
	}

	stories{
		id, title, story, tags, datetime_created, last_update, publisher_id
	}
	
	likes{
		user_id, story_id, datetime
	}

	comments{
		id, commenter_id, story_id, comment
	}

	comments_replies{
		commenter_id, story_id, comment_id, comment
	}

	views{
		user_id, story_id, duration, datetime
	}
	
	accesses{
		id, user_id, ip, useragent, datetime
	}
}





"""

"""
	user = Users(id=0,
				token="1",
				full_name="guilherme 3",
				email="1",
				birthdate="1912-04-12",
				photo="1",
				locale="12",
				ip="1",
				datetime_created_account="111",
				last_datetime_online="111",
				)


	db.session.add(user)
	db.session.commit()
"""