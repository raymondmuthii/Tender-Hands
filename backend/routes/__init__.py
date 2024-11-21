# app/routes/_init_.py
from flask import Blueprint

# Create blueprints
auth_bp = Blueprint('auth', __name__)
charity_bp = Blueprint('charity', __name__)
donation_bp = Blueprint('donation', __name__)
story_bp = Blueprint('story', __name__)
user_bp = Blueprint('user', __name__)
charity_admin_bp = Blueprint('charity_admin', __name__)
admin_bp = Blueprint('admin', __name__)


# Import routes after blueprint creation to avoid circular imports
from backend.routes import auth, charity, donation, story, user, charity_admin, admin