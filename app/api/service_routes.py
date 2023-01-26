from flask import Blueprint, jsonify , request
from flask_login import login_required
from app.models import User, Service, db
from ..forms.service_form import ServiceForm

service_routes = Blueprint('service', __name__)

# get all services
@service_routes.route('/')
def get_all_services():

    services = Service.query.all()

    return {'services': [service.to_dict() for service in services]}


# get service by id
@service_routes.route('/<int:id>')
def get_service_by_id(id):
    service = Service.query.get(id)

    return service.to_dict()

#post a service
@service_routes.route('/', methods=['POST'])
# @login_required
def post_service():
    form = ServiceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('form----------', form)
    print('form----------', form.data)

    if form.validate_on_submit():
        new_service = Service()
        form.populate_obj(new_service)
        print('new service------', new_service)

        db.session.add(new_service)
        db.session.commit()
        return new_service.to_dict(), 201
    if form.errors:
        return {
            "errors": form.errors
        }, 400
