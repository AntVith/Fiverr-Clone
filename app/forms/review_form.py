from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    service_id = IntegerField('Service Id', validators=[DataRequired()])
    review = StringField('Review', validators=[DataRequired()])
    stars = IntegerField('Stars', validators=[DataRequired()])
