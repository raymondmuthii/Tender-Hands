# app/routes/__init__.py
from .auth import bp as auth_bp
from .charity import bp as charity_bp
from .donation import bp as donation_bp
from .admin import bp as admin_bp

# Export the blueprints for registration in app/__init__.py
auth = auth_bp
charity = charity_bp
donation = donation_bp
admin = admin_bp
