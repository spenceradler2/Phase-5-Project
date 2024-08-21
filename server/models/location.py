from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db
from models.travel_plan import TravelPlan


class Location(db.Model, SerializerMixin):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    travel_plans = db.relationship('TravelPlan', back_populates='location', cascade='all, delete-orphan')
    users = association_proxy('travel_plans', 'users', creator= lambda user_obj: TravelPlan(user=user_obj))
    
    serialize_rules=('-travel_plans.location',)

    def __repr__(self):
        return f"<Location {self.name}>"