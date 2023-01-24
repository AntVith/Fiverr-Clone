from .db import db, environment, SCHEMA, add_prefix_for_prod

class Booking(db.Model):
    __tablename__='bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    service_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('services.id'), ondelete='CASCADE'), nullable=False)
    price = db.Column(db.String(500))
    instructions = db.Column(db.String(500))

    user = db.relationship('User', back_populates='bookings')
    service = db.relationship('Service', back_populates='bookings')

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "service_id": self.service_id,
            "price": self.price,
            'instructions': self.instructions
        }
