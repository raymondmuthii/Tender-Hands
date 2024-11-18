# app/routes/charity_admin.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.decorators import charity_admin_required
from services.charity_admin_service import CharityAdminService

charity_admin_bp = Blueprint('charity_admin', __name__)

@charity_admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
@charity_admin_required
def get_dashboard():
    """Get charity admin dashboard data"""
    admin_id = get_jwt_identity()
    dashboard_data = CharityAdminService.get_dashboard_data(admin_id)
    return jsonify(dashboard_data), 200

@charity_admin_bp.route('/beneficiaries', methods=['POST'])
@jwt_required()
@charity_admin_required
def add_beneficiary():
    """Add a new beneficiary"""
    admin_id = get_jwt_identity()
    data = request.get_json()
    beneficiary = CharityAdminService.add_beneficiary(admin_id, data)
    return jsonify(beneficiary), 201

@charity_admin_bp.route('/stories', methods=['POST'])
@jwt_required()
@charity_admin_required
def create_story():
    """Create a new story"""
    admin_id = get_jwt_identity()
    data = request.get_json()
    story = CharityAdminService.create_story(admin_id, data)
    return jsonify(story), 201

@charity_admin_bp.route('/donations', methods=['GET'])
@jwt_required()
@charity_admin_required
def get_donations():
    """Get all donations for the charity"""
    admin_id = get_jwt_identity()
    donations = CharityAdminService.get_donations(admin_id)
    return jsonify(donations), 200

@charity_admin_bp.route('/inventory', methods=['POST'])
@jwt_required()
@charity_admin_required
def add_inventory():
    """Add new inventory items"""
    admin_id = get_jwt_identity()
    data = request.get_json()
    inventory = CharityAdminService.add_inventory(admin_id, data)
    return jsonify(inventory), 201
