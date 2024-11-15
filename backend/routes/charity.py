# app/routes/charity.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.charity import Charity
from schemas.charity import CharitySchema
from services.charity_service import CharityService
from ..utils.decorators import admin_required
from app import db

charity_bp = Blueprint('charity', __name__)
charity_schema = CharitySchema()
charities_schema = CharitySchema(many=True)

@charity_bp.route('/', methods=['GET'])
def get_charities():
    """Get all active charities"""
    try:
        charities = Charity.query.filter_by(status='active').all()
        return jsonify(charities_schema.dump(charities)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@charity_bp.route('/<int:id>', methods=['GET'])
def get_charity(id):
    """Get a specific charity by ID"""
    try:
        charity = Charity.query.get_or_404(id)
        return jsonify(charity_schema.dump(charity)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@charity_bp.route('/featured', methods=['GET'])
def get_featured_charities():
    """Get featured charities"""
    try:
        featured = Charity.query.filter_by(
            status='active', 
            featured=True
        ).all()
        return jsonify(charities_schema.dump(featured)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@charity_bp.route('/apply', methods=['POST'])
@jwt_required()
def apply_charity():
    """Apply for a new charity"""
    try:
        data = request.get_json()
        data['admin_id'] = get_jwt_identity()
        data['status'] = 'pending'  # All new applications start as pending

        # Validate required fields
        required_fields = ['name', 'description', 'email', 'category']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        charity = charity_schema.load(data)
        charity.set_password(data['password'])
        
        db.session.add(charity)
        db.session.commit()

        return jsonify({
            'message': 'Charity application submitted successfully',
            'charity': charity_schema.dump(charity)
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@charity_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_charity(id):
    """Update charity details"""
    try:
        charity = Charity.query.get_or_404(id)
        user_id = get_jwt_identity()
        
        # Check if user is charity admin or system admin
        if charity.admin_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403

        data = request.get_json()
        
        # Update allowed fields
        allowed_fields = [
            'name', 'description', 'mission', 'logo_url', 
            'cover_image', 'phone', 'address', 'category'
        ]
        
        for field in allowed_fields:
            if field in data:
                setattr(charity, field, data[field])
        
        db.session.commit()
        return jsonify(charity_schema.dump(charity)), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@charity_bp.route('/<int:id>/status', methods=['PATCH'])
@jwt_required()
@admin_required
def update_charity_status(id):
    """Update charity status (Admin only)"""
    try:
        charity = Charity.query.get_or_404(id)
        data = request.get_json()
        
        if 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
            
        if data['status'] not in ['pending', 'active', 'inactive']:
            return jsonify({'error': 'Invalid status'}), 400
        
        charity.status = data['status']
        db.session.commit()
        
        return jsonify({
            'message': f'Charity status updated to {data["status"]}',
            'charity': charity_schema.dump(charity)
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@charity_bp.route('/<int:id>/featured', methods=['PATCH'])
@jwt_required()
@admin_required
def toggle_featured(id):
    """Toggle charity featured status (Admin only)"""
    try:
        charity = Charity.query.get_or_404(id)
        charity.featured = not charity.featured
        db.session.commit()
        
        return jsonify({
            'message': f'Charity featured status updated',
            'featured': charity.featured,
            'charity': charity_schema.dump(charity)
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@charity_bp.route('/search', methods=['GET'])
def search_charities():
    """Search charities by name or category"""
    try:
        query = request.args.get('q', '')
        category = request.args.get('category', '')
        
        charities = Charity.query.filter_by(status='active')
        
        if query:
            charities = charities.filter(Charity.name.ilike(f'%{query}%'))
        if category:
            charities = charities.filter_by(category=category)
            
        return jsonify(charities_schema.dump(charities.all())), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
