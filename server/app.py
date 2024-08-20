from config import app
from flask import render_template
from models.user import User
from models.location import Location
from models.travel_plan import TravelPlan

from routes.TravelPlans import *
from routes.Users import *
from routes.Locations import *

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")


if __name__ == "__main__":
  app.run(port=5555, debug=True)
