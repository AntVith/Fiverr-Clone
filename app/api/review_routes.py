from flask import Blueprint, jsonify , request
from flask_login import login_required
from app.models import  Review, db
from ..forms.review_form import ReviewForm

review_routes = Blueprint('review', __name__)

# get all reviews of a service
@review_routes.route('/service/<int:serviceId>')
def get_reviews_of_booking(serviceId):
    reviews = Review.query.filter(Review.service_id == serviceId)

    return {'reviews': [review.to_dict() for review in reviews]}

# post a review of a service
@review_routes.route('/new', methods=['POST'])
def post_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review()
        form.populate_obj(new_review)

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    else:
        return {
            "errors": form.errors
        }, 400

#edit a review
@review_routes.route('/<int:review_id>/edit', methods=['PUT'])
def edit_review(review_id):
    review = Review.query.get(review_id)
    print('helloooooooooooooo')
    print('review ----------',review)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(review)

        db.session.add(review)
        db.session.commit()
        return review.to_dict(), 200
    else:
        return {
            "errors": form.errors
        }, 400

#delete a review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
def delete_review(reviewId):
    review = Review.query.get(reviewId)

    db.session.delete(review)
    db.session.commit()

    return {"message": 'successfully deleted'}, 200
