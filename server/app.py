from config import app

from models.user import User
from models.location import Location
from models.travel_plan import TravelPlan

from routes.TravelPlans import *
from routes.Users import *
from routes.Locations import *


if __name__ == "__main__":
  app.run(port=5555, debug=True)
