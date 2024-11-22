# app/routes/admin.py
from flask import Blueprint, request, jsonify
from app.models import Charity
from app.models import User
from app.models import Donation
from app.routes.auth_decorators import admin_required
from app import db
from datetime import datetime

bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@bp.route('/dashboard', methods=['GET'])
@admin_required
def get_dashboard():
    try:
        # Get overview statistics
        total_charities = Charity.query.count()
        pending_applications = Charity.query.filter_by(status='pending').count()
        total_donations = db.session.query(db.func.sum(Donation.amount)).scalar() or 0
        total_donors = User.query.filter_by(role='donor').count()
        
        return jsonify({
            'statistics': {
                'total_charities': total_charities,
                'pending_applications': pending_applications,
                'total_donations': float(total_donations),
                'total_donors': total_donors
            }
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/applications', methods=['GET'])
@admin_required
def get_applications():
    try:
        status = request.args.get('status', 'pending')
        applications = Charity.query.filter_by(status=status).all()
        
        return jsonify({
            'applications': [{
                'id': app.id,
                'name': app.name,
                'description': app.description,
                'created_at': app.created_at.isoformat(),
                'status': app.status
            } for app in applications]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/applications/<int:charity_id>/review', methods=['POST'])
@admin_required
def review_application(charity_id):
    try:
        data = request.json
        if 'status' not in data or data['status'] not in ['approved', 'rejected']:
            return jsonify({'error': 'Invalid status'}), 400
            
        charity = Charity.query.get_or_404(charity_id)
        charity.status = data['status']
        charity.reviewed_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'message': f'Application {data["status"]} successfully',
            'charity': {
                'id': charity.id,
                'name': charity.name,
                'status': charity.status
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@bp.route('/charities/<int:charity_id>', methods=['DELETE'])
@admin_required
def delete_charity(charity_id):
    try:
        charity = Charity.query.get_or_404(charity_id)
        
        # Delete associated donations first
        Donation.query.filter_by(charity_id=charity_id).delete()
        
        # Delete the charity
        db.session.delete(charity)
        db.session.commit()
        
        return jsonify({
            'message': 'Charity and associated records deleted successfully',
            'charity_id': charity_id
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
