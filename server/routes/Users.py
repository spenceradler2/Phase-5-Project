from flask import request
from config import db, api, app 

from flask_restful import Resource
from models.user import User
from sqlalchemy.exc import IntegrityError


class UsersResource(Resource):
    def get(self):
      users = [user.to_dict() for user in User.query.all()]
      return users, 200
    
    def post(self):
      data = request.get_json()
      name = data.get("name")
      username = data.get("username")
      # To be uncommented when authentication is added.
      # password = data.get("password")
      try:
        user = User(name=name,
                  username=username,
                  # To be uncommented when authentication is added.
                  # password=password
                  ) 
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201
      except IntegrityError as e:
        return {"error": e.orig.args[0]}, 422
      except ValueError as e:
        return {"error": str(e)}, 422
api.add_resource(UsersResource, "/api/users", endpoint="users")

class UserResource(Resource):
  def get(self, id):
    user = User.query.get(id)
    return user.to_dict(), 200
  
api.add_resource(UserResource, "/api/user/<int:id>", endpoint="user")
