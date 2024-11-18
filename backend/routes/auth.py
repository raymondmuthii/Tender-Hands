# app/routes/auth.py
from datetime import datetime, timedelta
from flask import jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from marshmallow import ValidationError
from .extensions import db
from ..models.user import User
from ..schemas.user import UserSchema
from . import auth_bp

user_schema = UserSchema()

@auth_bp.route('/login', methods=['POST'])
def login():
    """Handle user login with rate limiting and account lockout."""
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing email or password'}), 400
    
    user = User.query.filter_by(email=data['email'].lower().strip()).first()
    
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    if user.is_locked:
        return jsonify({
            'error': 'Account is temporarily locked',
            'locked_until': user.locked_until.isoformat()
        }), 423
    
    if not user.is_active:
        return jsonify({'error': 'Account is deactivated'}), 403
    
    if user.check_password(data['password']):
        _login_at = datetime.utcnow()
        user.failed_login_attempts = 0
        user.locked_until = None
        db.session.commit()
        
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': user_schema.dump(user)
        }), 200
    
    user.failed_login_attempts += 1
    if user.failed_login_attempts >= user.MAX_FAILED_ATTEMPTS:
        user.locked_until = datetime.utcnow() + timedelta(minutes=user.LOCKOUT_DURATION)
    db.session.commit()
    
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    """Handle user registration."""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
        
    if User.query.filter_by(email=data.get('email', '').lower().strip()).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    try:
        user = user_schema.load(data)
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'message': 'Registration successful',
            'access_token': access_token,
            'user': user_schema.dump(user)
        }), 201
    except ValidationError as e:
        return jsonify({'error': e.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred during registration'}), 500

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Handle password change for authenticated users."""
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    
    data = request.get_json()
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    
    if not current_password or not new_password:
        return jsonify({'error': 'Both current and new password are required'}), 400
        
    if not user.check_password(current_password):
        return jsonify({'error': 'Current password is incorrect'}), 401
    
    user.set_password(new_password)
    db.session.commit()
    
    return jsonify({'message': 'Password changed successfully'}), 200
