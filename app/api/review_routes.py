from flask import Blueprint, jsonify , request
from flask_login import login_required
from app.models import  Review, db
# from ..forms.booking_form import ReviewForm

review_routes = Blueprint('review', __name__)

# get all reviews of a service
@review_routes.route('/service/<int:serviceId>')
def get_reviews_of_booking(serviceId):
    reviews = Review.query.filter(Review.service_id == serviceId)

    return {'reviews': [review.to_dict() for review in reviews]}
