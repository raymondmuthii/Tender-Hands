# app/routes/auth_decorators.py
from functools import wraps
from flask import jsonify, request, g
from werkzeug.security import check_password_hash
from app.models import User

def get_user_from_token(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
    try:
        # Basic auth implementation for functionality
        # Format: "Basic email:password"
        auth_type, credentials = auth_header.split()
        if auth_type.lower() != 'basic':
            return None
        email, password = credentials.split(':')
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            return user
    except Exception:
        return None
    return None

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = get_user_from_token(request)
        if not user:
            return jsonify({'error': 'Authentication required'}), 401
        g.user = user
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = get_user_from_token(request)
        if not user or user.role != 'admin':
            return jsonify({'error': 'Admin privileges required'}), 403
        g.user = user
        return f(*args, **kwargs)
    return decorated_function

def charity_admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = get_user_from_token(request)
        if not user or user.role != 'charity_admin':
            return jsonify({'error': 'Charity admin privileges required'}), 403
        g.user = user
        return f(*args, **kwargs)
    return decorated_function
