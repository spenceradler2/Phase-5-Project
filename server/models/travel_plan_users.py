from config import db, metadata

travel_plan_users = db.Table(
    'travel_plans_users',
    metadata,
    db.Column('travel_plan_id', db.Integer, db.ForeignKey(
        'travel_plans.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
)