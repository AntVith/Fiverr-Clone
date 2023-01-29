from flask import Blueprint, jsonify , request
from flask_login import login_required
from app.models import User, Service, db, Booking

booking_routes = Blueprint('booking', __name__)

# get all bookings based on user id
@booking_routes.route('/<int:userId>')
def get_bookings_by_userId(userId):
    bookings = Booking.query.filter(Booking.user_id == userId)

    return {'bookings' :[booking.to_dict() for booking in bookings]} , 200
