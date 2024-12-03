from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from models.travel_plan import TravelPlan
from models.travel_plan_users import travel_plan_users
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String) 
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String) #To be used when authentication is added.

    travel_plans = db.relationship('TravelPlan', secondary=travel_plan_users, back_populates= 'users')

    locations = association_proxy('travel_plans', 'locations', creator= lambda location_obj: TravelPlan(location=location_obj))


    @property
    def password_hash(self):
        return self._password_hash

  
    @password_hash.setter
    def password_hash(self, password):
        # Hash the password before storing it
        pw_hash = bcrypt.generate_password_hash(password)
        self._password_hash = pw_hash.decode('utf-8')  # Store as a string

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    serialize_rules=('-travel_plans.users', "-_password_hash",)

    def __repr__(self):
        return f"<Name {self.name}, {self.username} >"