"""migrating models

Revision ID: d3541162333f
Revises: f7a9ab75dfdc
Create Date: 2024-08-13 09:49:35.938865

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3541162333f'
down_revision = 'f7a9ab75dfdc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_locations'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('username', name=op.f('uq_users_username'))
    )
    op.create_table('travel_plans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('iframe_src_or_link', sa.String(), nullable=True),
    sa.Column('start_date', sa.Date(), nullable=True),
    sa.Column('end_date', sa.Date(), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], name=op.f('fk_travel_plans_location_id_locations')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_travel_plans'))
    )
    op.create_table('travel_plans_users',
    sa.Column('travel_plan_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['travel_plan_id'], ['travel_plans.id'], name=op.f('fk_travel_plans_users_travel_plan_id_travel_plans')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_travel_plans_users_user_id_users')),
    sa.PrimaryKeyConstraint('travel_plan_id', 'user_id', name=op.f('pk_travel_plans_users'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('travel_plans_users')
    op.drop_table('travel_plans')
    op.drop_table('users')
    op.drop_table('locations')
    # ### end Alembic commands ###