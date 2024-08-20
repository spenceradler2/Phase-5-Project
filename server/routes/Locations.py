from config import api, app 

from flask_restful import Resource
from models.location import Location


class LocationsResource(Resource):
    def get(self):
      locations = [location.to_dict() for location in Location.query.all()]
      return locations, 200
    
api.add_resource(LocationsResource, "/api/locations", endpoint="locations")

class LocationResource(Resource):
  def get(self, id):
    location = Location.query.get(id)
    return location.to_dict(), 200
  
api.add_resource(LocationResource, "/api/location/<int:id>", endpoint="location")
