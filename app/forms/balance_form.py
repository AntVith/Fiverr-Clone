from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class BalanceForm(FlaskForm):
  balance = IntegerField('Balance')
