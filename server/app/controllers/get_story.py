from __main__ import app
from app.db import db
from app.models.tables import User, Story
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
			story = Story.query.filter_by(id=story_id) \
				.with_entities(Story.id, Story.title, Story.text, Story.preview, Story.tags, Story.datetime_created, Story.publisher_id).first();
			if story == None:
				response['message'] = 'story not found'
			else:	
				response['payload'] = {"id": story.id, "title": story.title, "text": story.text, "preview": story.preview, "tags": story.tags, "datetime_created": story.datetime_created, "publisher_id": story.publisher_id}
				response['status'] = True
				response['message'] = 'ok'	
	return(json.dumps(response))