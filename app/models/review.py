from .db import db, environment, SCHEMA, add_prefix_for_prod



class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    service_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('services.id'), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String(2000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='reviews')
    service = db.relationship('Service', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'service_id': self.service_id,
            'review': self.review,
            'stars': self.stars,
        }
