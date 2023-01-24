from .db import db, environment, SCHEMA, add_prefix_for_prod



class Service(db.Model):
    __tablename__ = 'services'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    thumbnail = db.Column(db.String(1000), nullable=False)


    user = db.relationship('User', back_populates='services')
    reviews = db.relationship("Review",cascade='all, delete-orphan', back_populates='service')
    bookings = db.relationship("Booking",cascade='all, delete-orphan', back_populates='service')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'thumbnail': self.thumbnail
        }
