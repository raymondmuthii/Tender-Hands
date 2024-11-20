# app/routes/_init_.py
from flask import Blueprint

# Create blueprints
auth_bp = Blueprint('auth', _name_)
charity_bp = Blueprint('charity', _name_)
donation_bp = Blueprint('donation', _name_)
story_bp = Blueprint('story', _name_)
user_bp = Blueprint('user', _name_)
charity_admin_bp = Blueprint('charity_admin', _name_)
admin_bp = Blueprint('admin', _name_)


# Import routes after blueprint creation to avoid circular imports
from . import auth, charity, donation, story, user, charity_admin, admin