from flask import request, session
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
      password = data.get("password")
      try:
        user = User(name=name,
                  username=username,
                  # password=password
                  )
        user.password_hash = password
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id

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

class Login(Resource):
  def post(self):
    # Check if user exists.
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username).first()
    if user and user.authenticate(password):
      session["user_id"] = user.id
      return user.to_dict(), 200
    else:
      return {"error": "Username or password didn't match"}, 422

api.add_resource(Login, "/api/login")

class CheckSession(Resource):
  def get(self):
    user_id = session.get("user_id")
    if user_id:
      user = User.query.get(user_id)
      return user.to_dict(), 200
    else:
      return {"message": "user not signed in"}, 401

api.add_resource(CheckSession, "/api/check-session")

class Logout(Resource):
  def delete(self):
    if session.get("user_id"):
      del session["user_id"]
      return {}, 204
    else:
      return {"error": "User is not signed in"}, 401

api.add_resource(Logout, "/api/logout")