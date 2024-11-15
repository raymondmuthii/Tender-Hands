# app/services/admin_service.py
from app import db
from models.user import User
from models.charity import Charity
from werkzeug.exceptions import NotFound, Forbidden

class AdminService:
    @staticmethod
    def get_pending_charities():
        """Get all pending charity applications"""
        return Charity.query.filter_by(status='pending').all()
    
    @staticmethod
    def approve_charity(charity_id):
        """Approve a charity application"""
        charity = Charity.query.get_or_404(charity_id)
        charity.status = 'active'
        db.session.commit()
        return charity
    
    @staticmethod
    def reject_charity(charity_id, reason=None):
        """Reject a charity application"""
        charity = Charity.query.get_or_404(charity_id)
        charity.status = 'rejected'
        charity.rejection_reason = reason
        db.session.commit()
        return charity
    
    @staticmethod
    def get_all_users():
        """Get all users in the system"""
        return User.query.all()
    
    @staticmethod
    def toggle_user_status(user_id):
        """Activate/deactivate a user"""
        user = User.query.get_or_404(user_id)
        user.is_active = not user.is_active
        db.session.commit()
        return user
    
    @staticmethod
    def change_user_role(user_id, new_role):
        """Change a user's role"""
        user = User.query.get_or_404(user_id)
        user.role = new_role
        db.session.commit()
        return user

