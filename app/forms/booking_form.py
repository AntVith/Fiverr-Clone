from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    service_id = IntegerField('Service Id', validators=[DataRequired()])
    instructions = StringField('Instructions', validators=[DataRequired()])
