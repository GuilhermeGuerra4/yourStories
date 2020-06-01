from __main__ import app

@app.route('/test2', methods=['GET'])
def get_stories2():
	return "<h1>Hei2<h1>"