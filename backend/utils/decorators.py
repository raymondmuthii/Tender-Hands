# app/utils/decorators.py
from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from models.user import User

def admin_required(f):
    """Decorator to check if user is an admin"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or user.role != 'admin':
            return jsonify({
                'error': 'Admin privileges required'
            }), 403
            
        return f(*args, **kwargs)
    return decorated_function

def charity_admin_required(f):
    """Decorator to check if user is a charity admin"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or user.role != 'charity_admin':
            return jsonify({
                'error': 'Charity admin privileges required'
            }), 403
            
        return f(*args, **kwargs)
    return decorated_function

def permission_required(*roles):
    """Decorator to check if user has any of the specified roles"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            
            if not user or user.role not in roles:
                return jsonify({
                    'error': 'Insufficient permissions'
                }), 403
                
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def ownership_required(model):
    """Decorator to check if user owns the resource"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            # Get the resource ID from kwargs
            resource_id = kwargs.get('id')
            if not resource_id:
                return jsonify({
                    'error': 'Resource ID not provided'
                }), 400
                
            # Get the resource
            resource = model.query.get(resource_id)
            if not resource:
                return jsonify({
                    'error': 'Resource not found'
                }), 404
                
            # Check ownership
            if getattr(resource, 'user_id', None) != user_id:
                return jsonify({
                    'error': 'You do not own this resource'
                }), 403
                
            return f(*args, **kwargs)
        return decorated_function
    return decorator
