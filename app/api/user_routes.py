from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from ..forms.balance_form import BalanceForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# edit balance of user
@user_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_user(id):
    user_info = User.query.get(id)
    form = BalanceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        form.populate_obj(user_info)

        db.session.add(user_info)
        db.session.commit()
        return user_info.to_dict(), 200

# add to balance of user
@user_routes.route('/<int:id>/add', methods=['PUT'])
def add_to_user_balance(id):
    user_info = User.query.get(id)
    form = BalanceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:

        prev_balance = user_info.balance
        form.populate_obj(user_info)
        user_info.balance += prev_balance

        db.session.add(user_info)
        db.session.commit()
        return user_info.to_dict(), 200



@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
