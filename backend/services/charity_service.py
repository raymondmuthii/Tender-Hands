# app/services/charity_service.py
from app import db
from models.charity import Charity
from models.user import User
from werkzeug.exceptions import NotFound, Forbidden

class CharityService:
    @staticmethod
    def get_all_charities():
        """Get all active charities"""
        return Charity.query.filter_by(status='active').all()
    
    @staticmethod
    def get_charity_by_id(charity_id):
        """Get charity by ID"""
        charity = Charity.query.get(charity_id)
        if not charity:
            raise NotFound('Charity not found')
        return charity

    @staticmethod
    def get_featured_charities():
        """Get featured charities"""
        return Charity.query.filter_by(
            status='active',
            featured=True
        ).all()

    @staticmethod
    def create_charity(data, admin_id):
        """Create a new charity"""
        # Check if admin exists
        admin = User.query.get(admin_id)
        if not admin:
            raise NotFound('Admin user not found')

        charity = Charity(
            name=data['name'],
            description=data['description'],
            email=data['email'],
            admin_id=admin_id,
            category=data['category'],
            mission=data.get('mission'),
            phone=data.get('phone'),
            address=data.get('address'),
            logo_url=data.get('logo_url'),
            cover_image=data.get('cover_image'),
            status='pending'
        )
        
        if 'password' in data:
            charity.set_password(data['password'])

        db.session.add(charity)
        db.session.commit()
        return charity

    @staticmethod
    def update_charity(charity_id, data, user_id):
        """Update charity details"""
        charity = CharityService.get_charity_by_id(charity_id)
        
        # Check if user has permission
        if charity.admin_id != user_id:
            raise Forbidden('You do not have permission to update this charity')

        # Update allowed fields
        allowed_fields = [
            'name', 'description', 'mission', 'phone', 
            'address', 'logo_url', 'cover_image', 'category'
        ]
        
        for field in allowed_fields:
            if field in data:
                setattr(charity, field, data[field])

        db.session.commit()
        return charity

    @staticmethod
    def update_charity_status(charity_id, status):
        """Update charity status (admin only)"""
        charity = CharityService.get_charity_by_id(charity_id)
        charity.status = status
        db.session.commit()
        return charity

    @staticmethod
    def toggle_featured(charity_id):
        """Toggle charity featured status"""
        charity = CharityService.get_charity_by_id(charity_id)
        charity.featured = not charity.featured
        db.session.commit()
        return charity

    @staticmethod
    def search_charities(query=None, category=None):
        """Search charities by name or category"""
        charities = Charity.query.filter_by(status='active')
        
        if query:
            charities = charities.filter(Charity.name.ilike(f'%{query}%'))
        if category:
            charities = charities.filter_by(category=category)
            
        return charities.all()

    @staticmethod
    def get_charity_stats(charity_id):
        """Get charity statistics"""
        charity = CharityService.get_charity_by_id(charity_id)
        return {
            'total_donations': charity.total_donations(),
            'donor_count': len(set(d.donor_id for d in charity.donations)),
            'story_count': len(charity.stories),
            'beneficiary_count': len(charity.beneficiaries)
        }
