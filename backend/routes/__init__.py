# app/routes/__init__.py
from flask import Blueprint

# Create blueprints
auth_bp = Blueprint('auth', __name__)
charity_bp = Blueprint('charity', __name__)
donation_bp = Blueprint('donation', __name__)
story_bp = Blueprint('story', __name__)
user_bp = Blueprint('user', __name__)

# Import routes after blueprint creation to avoid circular imports
from . import auth, charity, donation, story, user
