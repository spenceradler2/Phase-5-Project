from sqlalchemy_serializer import SerializerMixin
from config import db
from models.travel_plan_users import travel_plan_users

class TravelPlan(db.Model, SerializerMixin):
    __tablename__ = "travel_plans"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    iframe_src_or_link = db.Column(db.String)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date) 

    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))

    users = db.relationship('User', secondary=travel_plan_users, back_populates= 'travel_plans')
    location = db.relationship('Location', back_populates= 'travel_plans')

    serialize_rules=('-users.travel_plans','-location.travel_plans')
    
    def __repr__(self):
        return f"<Travel Plan {self.name},  {self.iframe_src_or_link}, {self.date}, {self.user_id}, {self.location_id}  >"