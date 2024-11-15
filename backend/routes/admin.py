# app/routes/admin.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from utils.decorators import admin_required
from services.admin_service import AdminService

admin_bp = Blueprint('admin', __name__)

# Admin routes for managing all charities
@admin_bp.route('/charities', methods=['GET'])
@jwt_required()
@admin_required
def get_all_charities():
    """Get all charities including pending ones"""
    charities = AdminService.get_all_charities()
    return jsonify(charities), 200

@admin_bp.route('/charities/<int:charity_id>/approve', methods=['POST'])
@jwt_required()
@admin_required
def approve_charity(charity_id):
    """Approve a pending charity"""
    AdminService.approve_charity(charity_id)
    return jsonify({'message': 'Charity approved successfully'}), 200

@admin_bp.route('/charities/<int:charity_id>/reject', methods=['POST'])
@jwt_required()
@admin_required
def reject_charity(charity_id):
    """Reject a pending charity"""
    AdminService.reject_charity(charity_id)
    return jsonify({'message': 'Charity rejected'}), 200

# Admin routes for managing users
@admin_bp.route('/users', methods=['GET'])
@jwt_required()
@admin_required
def get_all_users():
    """Get all users"""
    users = AdminService.get_all_users()
    return jsonify(users), 200

@admin_bp.route('/users/<int:user_id>/block', methods=['POST'])
@jwt_required()
@admin_required
def block_user(user_id):
    """Block a user"""
    AdminService.block_user(user_id)
    return jsonify({'message': 'User blocked'}), 200
