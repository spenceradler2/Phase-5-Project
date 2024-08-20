from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db
from models.travel_plan import TravelPlan
from models.travel_plan_users import travel_plan_users


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String) 
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String) #Add contraint for viewing review lecture. 

    travel_plans = db.relationship('TravelPlan', secondary=travel_plan_users, back_populates= 'users')

    locations = association_proxy('travel_plans', 'locations', creator= lambda location_obj: TravelPlan(location=location_obj))

    serialize_rules=('-travel_plans.users',)

    def __repr__(self):
        return f"<Name {self.name}, {self.username} >"