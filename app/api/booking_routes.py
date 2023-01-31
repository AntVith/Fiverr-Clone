from flask import Blueprint, jsonify , request
from flask_login import login_required
from app.models import User, Service, db, Booking
from ..forms.booking_form import BookingForm

booking_routes = Blueprint('booking', __name__)

# get all bookings based on user id
@booking_routes.route('/<int:userId>')
def get_bookings_by_userId(userId):
    bookings = Booking.query.filter(Booking.user_id == userId)

    return {'bookings' :[booking.to_dict() for booking in bookings]} , 200

#get all bookings based on service id
@booking_routes.route('/service/<int:serviceId>')
def get_bookings_by_serviceId(serviceId):
    bookings = Booking.query.filter(Booking.service_id == serviceId)

    return {'bookings':[booking.to_dict() for booking in bookings] }

#delete a booking based on booking id
@booking_routes.route('/<int:booking_id>/delete', methods=['DELETE'])
def delete_booking(booking_id):
    booking = Booking.query.get(booking_id)

    db.session.delete(booking)
    db.session.commit()

    return {"message": 'successfully deleted'}, 200

#edit a booking based on booking id
@booking_routes.route('/<int:booking_id>/edit', methods=['PUT'])
def edit_booking(booking_id):
    booking = Booking.query.get(booking_id)

    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(booking)

        db.session.add(booking)
        db.session.commit()
        return booking.to_dict(), 200
