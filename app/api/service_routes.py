from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Service

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
