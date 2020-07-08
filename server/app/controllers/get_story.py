from __main__ import app
from app.db import db
from app.models.tables import User, Story, View, Comment
from app.functions.auth_help import verify_login
from app.functions.user import get_user_by_token
from flask import request
import json

@app.route('/get_story/<token>/<int:story_id>/', methods=['GET'])
def get_story(token=None, story_id=None):
	response = {'status': False, 'message': ''}
	if token == None or id == None:
		response['message'] = 'bad request'
	else:
		is_signed = verify_login(token)
		if is_signed == False:
			response['message'] = 'not authorized'
		else:

			sql_query = "SELECT story.*,\
				(SELECT COUNT(comment.id) from comment WHERE comment.story_id LIKE story.id) as 'comments',\
				(SELECT COUNT(view.story_id) from view WHERE view.story_id LIKE story.id) as 'views',\
				(SELECT COUNT(enjoy.story_id) from enjoy WHERE enjoy.story_id LIKE story.id) as 'enjoys'\
				FROM story WHERE story.id LIKE {0} and story.status LIKE 'published'\
				GROUP BY story.id LIMIT 1".format(story_id)

			result = db.session.execute(sql_query)
			story = result.fetchone()

			if story == None:
				response['message'] = 'story not found'
			else:					
				response['payload'] = {\
					"id": story[0],\
					"title": story[1],\
					"text": story[2],\
					"preview": story[3],\
					"tags": story[4],\
					"datetime_created": story[5],\
					"publisher_id": story[6],\
					"views": story.views,\
					"enjoys": story.enjoys,\
					"comments":story.comments}
				
				response['status'] = True
				response['message'] = 'ok'	
	return(json.dumps(response))