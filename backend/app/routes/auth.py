# app/routes/auth.py
from flask import Blueprint, request, jsonify, g
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from app.routes.auth_decorators import login_required
from app import db

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        required_fields = ['email', 'password', 'phone_number', 'full_name']
        
        # Validate required fields
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Check existing user
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        if User.query.filter_by(phone_number=data['phone_number']).first():
            return jsonify({'error': 'Phone number already registered'}), 400
        
        # Create new user
        user = User(
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            phone_number=data['phone_number'],
            full_name=data['full_name'],
            role=data.get('role', 'donor')
        )
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            'message': 'Registration successful',
            'user': {
                'id': user.id,
                'email': user.email,
                'phone_number': user.phone_number,
                'role': user.role
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        
        # Allow login with email or phone
        identifier = data.get('identifier')
        password = data.get('password')
        
        if not identifier or not password:
            return jsonify({'error': 'Missing credentials'}), 400
        
        # Find user by email or phone
        user = User.query.filter(
            (User.email == identifier) | (User.phone_number == identifier)
        ).first()
        
        if user and check_password_hash(user.password_hash, password):
            return jsonify({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'phone_number': user.phone_number,
                    'role': user.role
                }
            }), 200
            
        return jsonify({'error': 'Invalid credentials'}), 401
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@bp.route('/profile', methods=['GET'])
@login_required
def get_profile():
    return jsonify({
        'user': {
            'id': g.user.id,
            'email': g.user.email,
            'phone_number': g.user.phone_number,
            'full_name': g.user.full_name,
            'role': g.user.role
        }
    }), 200
