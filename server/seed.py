from config import app, db
from models.user import User
from models.location import Location
from models.travel_plan import TravelPlan
from sqlalchemy import text
from datetime import date

if __name__ == "__main__":
  with app.app_context():
    print("Starting seeding")
    print('Deleting travel plan users...')
    db.session.execute(text('DELETE FROM travel_plans_users'))
    db.session.commit()
    print('Deleting users...')
    User.query.delete()
    print('Deleting travel plans...')
    TravelPlan.query.delete()
    print('Deleting locations...')
    Location.query.delete()



    print('Creating users...')
    user_1 = User(name="Spencer Adler", username="spenceradler2", password = "test")
    user_2 = User(name="Jennifer Scharf", username="jennsam95", password = "testtest")
    user_3 = User(name="Regan Cruz", username="rcruz", password = "test3")
    user_4 = User(name="Dylan Levine", username="dljeter", password = "test4")
    user_5 = User(name="Mike Perlman", username="mp824", password = "test5")
    user_6 = User(name="Aliza Bran", username="aliza", password = "aliza1")
    user_7 = User(name="Eric", username="eric", password = "eric1")
    user_8 = User(name="Kalyn Holder", username="kayln", password = "kalyn1")
    user_9 = User(name="Leah Clegg", username="leah", password = "leah1")

    users = [user_1, user_2, user_3, user_4, user_5,user_6,user_7,user_8,user_9 ]
    db.session.add_all(users)
    db.session.commit()

    print('Creating locations...')
    location_1 = Location(name="New York, New York")
    location_2 = Location(name="East Hampton, New York")
    location_3 = Location(name="Madrid, Spain")
    location_4 = Location(name="Paris, France")
    location_5 = Location(name="Jackson, Wyoming")
    location_6 = Location(name="Portland, Maine")

    locations = [location_1, location_2,location_3,location_4,location_5,location_6 ]

    db.session.add_all(locations)
    db.session.commit()

    print('Creating travel plans...')
    travel_plan_1 = TravelPlan(name="Day Trip to NYC", 
                               iframe_src_or_link="https://www.google.com/maps/d/embed?mid=1Ow5qT9bl--8PoGV7zoEh6PoLLwUhYf8&ehbc=2E312F",
                               start_date=date(2024,8,17),  
                               end_date= date(2024,8,18),
                               location_id=location_1.id,
                               users=[user_1],
                               )
    
    travel_plan_2 = TravelPlan(name="Vacation in the Hamptons", 
                               iframe_src_or_link="https://maps.app.goo.gl/WxjP7j5CJVzYH5UeA",
                               start_date= date(2024,8,21),
                               end_date= date(2024,8,21), 
                               location_id=location_2.id, 
                               users=[user_1, user_2],
                               )
    
    travel_plan_3 = TravelPlan(name="Trip to Jackson", 
                               iframe_src_or_link="https://www.google.com/maps/d/embed?mid=15EHk4dxCrnPZojKAVsYCDjaea_wZmUw&ehbc=2E312F",
                               start_date= date(2024,9,8),
                               end_date= date(2024,9,11), 
                               location_id=location_5.id, 
                               users=[user_1, user_3],
                              )
    travel_plan_4 = TravelPlan(name="Maine!!!", 
                               iframe_src_or_link="https://www.google.com/maps/d/embed?mid=1EGMIvoCDkvvJlaP70YydUf5MDjr9W5k&ehbc=2E312F",
                               start_date= date(2024,8,25),
                               end_date= date(2024,9,3), 
                               location_id=location_6.id, 
                               users=[user_9],
                              )
    
    travel_plan_5 = TravelPlan(name="Trip to East Hampton!", 
                               iframe_src_or_link="https://www.google.com/maps/d/embed?mid=1LYAG9uDZbzRLc-uriAsEUYoquuDDbzQ&ehbc=2E312F",
                               start_date= date(2024,8,11),
                               end_date= date(2024,8,17), 
                               location_id=location_2.id, 
                               users=[user_6, user_7],
                              )

                               

    travel_plans = [travel_plan_1, travel_plan_2, travel_plan_3, travel_plan_4, travel_plan_5]

    db.session.add_all(travel_plans)
    db.session.commit()

    print('Finished seeding')
