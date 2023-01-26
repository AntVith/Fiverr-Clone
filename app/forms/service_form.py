from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ServiceForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Descriptin', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    thumbnail = StringField('Thumbnail')
