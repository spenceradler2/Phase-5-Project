from flask import request
from config import db, api, app 

from flask_restful import Resource
from models.user import User
from models.location import Location
from models.travel_plan import TravelPlan
from sqlalchemy.exc import IntegrityError
from datetime import datetime

class TravelPlansResource(Resource):
    def get(self):
      travelplans = [travelplan.to_dict() for travelplan in TravelPlan.query.all()]
      return travelplans, 200

    def post(self):
      data = request.get_json()
      name = data.get("name")
      iframe_src_or_link = data.get("iframe_src_or_link")
      start_date = data.get("start_date")
      start_date_date_obj = datetime.strptime(start_date, '%Y-%m-%d')
      end_date = data.get("end_date")
      end_date_date_obj = datetime.strptime(end_date, '%Y-%m-%d')
      location_name = data.get("location_name")
      array_of_users_usernames = data.get("array_of_users_usernames")  
      # Check if the location already exists in the database
      if Location.query.filter_by(name=location_name).first():
        location = Location.query.filter_by(name=location_name).first()
        location_id = location.id
      else:
        location = Location(name=location_name)
        db.session.add(location)
        db.session.commit()
        location_id = location.id
      # Retrieve the User objects for the given list of usernames
      users = [User.query.filter_by(username=username).first() for username in array_of_users_usernames]
      
      # Check if any users do not exist
      if None in users:
        return {"message": "One of these users does not exist."}, 422
      else:
        travelplan = TravelPlan(name=name,
                                iframe_src_or_link=iframe_src_or_link, 
                                start_date=start_date_date_obj,
                                end_date=end_date_date_obj,
                                location_id=location_id, 
                                users=users,
                                )
        db.session.add(travelplan)
        db.session.commit()

    
      return travelplan.to_dict(), 201
        
api.add_resource(TravelPlansResource, "/api/travel_plans", endpoint="travel_plans")

class TravelPlanResource(Resource):
  def get(self, id):
    travel_plan = TravelPlan.query.get(id)
    return travel_plan.to_dict(), 200
  
  def patch(self, id):
    data = request.get_json()
    travel_plan = TravelPlan.query.get(id)
    try:
      # Loop through the provided fields and update the travel plan accordingly.
      for key, value in data.items():
        if hasattr(travel_plan, key):
          # If updating dates, convert the string to a datetime object
          if key=="start_date" or key=="end_date":
              start_or_end_date_date_obj = datetime.strptime(value, '%Y-%m-%d')    
              setattr(travel_plan, key, start_or_end_date_date_obj)
          else:
            setattr(travel_plan, key, value)
        else:
          return {"message": f"{key} is not an attribute of Travel Plan"}, 422
      db.session.add(travel_plan)
      db.session.commit()
      return travel_plan.to_dict(), 200

    except IntegrityError as e:
      return {"error": e.orig.args[0]}, 422
    except ValueError as e:
      return {"error": str(e)}, 422
  
  def delete(self, id):
    travel_plan = TravelPlan.query.get(id)
    db.session.delete(travel_plan)
    db.session.commit()
    return {}, 204

api.add_resource(TravelPlanResource, "/api/travel_plans/<int:id>", endpoint="travel_plan")
