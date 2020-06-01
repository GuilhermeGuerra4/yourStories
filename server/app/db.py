from __main__ import app
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/your_stories'
db = SQLAlchemy(app)

