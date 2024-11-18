# app/services/charity_admin_service.py
from app import db
from models.charity import Charity
from models.story import Story
from models.beneficiary import Beneficiary
from werkzeug.exceptions import NotFound, Forbidden

class CharityAdminService:
    @staticmethod
    def get_charity_stats(charity_id, admin_id):
        """Get statistics for a charity"""
        charity = Charity.query.get_or_404(charity_id)
        if charity.admin_id != admin_id:
            raise Forbidden('You do not have permission to view this charity')
            
        return {
            'total_donations': charity.total_donations(),
            'donor_count': len(set(d.donor_id for d in charity.donations)),
            'story_count': len(charity.stories),
            'beneficiary_count': len(charity.beneficiaries)
        }
    
    @staticmethod
    def update_charity_profile(charity_id, admin_id, data):
        """Update charity profile"""
        charity = Charity.query.get_or_404(charity_id)
        if charity.admin_id != admin_id:
            raise Forbidden('You do not have permission to update this charity')
            
        for field in ['name', 'description', 'mission', 'phone', 'address']:
            if field in data:
                setattr(charity, field, data[field])
                
        db.session.commit()
        return charity
    
    @staticmethod
    def add_beneficiary(charity_id, admin_id, data):
        """Add a new beneficiary"""
        charity = Charity.query.get_or_404(charity_id)
        if charity.admin_id != admin_id:
            raise Forbidden('You do not have permission to add beneficiaries')
            
        beneficiary = Beneficiary(
            charity_id=charity_id,
            name=data['name'],
            description=data.get('description'),
            contact_info=data.get('contact_info')
        )
        
        db.session.add(beneficiary)
        db.session.commit()
        return beneficiary
    
    @staticmethod
    def create_story(charity_id, admin_id, data):
        """Create a new story"""
        charity = Charity.query.get_or_404(charity_id)
        if charity.admin_id != admin_id:
            raise Forbidden('You do not have permission to create stories')
            
        story = Story(
            charity_id=charity_id,
            author_id=admin_id,
            title=data['title'],
            content=data['content'],
            image_url=data.get('image_url'),
            status='draft'
        )
        
        db.session.add(story)
        db.session.commit()
        return story
    
    @staticmethod
    def publish_story(story_id, admin_id):
        """Publish a story"""
        story = Story.query.get_or_404(story_id)
        if story.charity.admin_id != admin_id:
            raise Forbidden('You do not have permission to publish this story')
            
        story.status = 'published'
        db.session.commit()
        return story
    
    @staticmethod
    def get_charity_donations(charity_id, admin_id):
        """Get all donations for a charity"""
        charity = Charity.query.get_or_404(charity_id)
        if charity.admin_id != admin_id:
            raise Forbidden('You do not have permission to view these donations')
            
        return charity.donations
    
    @staticmethod
    def get_donation_stats(charity_id, admin_id, period=None):
        """Get donation statistics"""
        charity = Charity.query.get_or_404(charity_id)
        if charity.admin_id != admin_id:
            raise Forbidden('You do not have permission to view these statistics')
            
        donations = charity.donations
        if period:
            # Add period filtering logic here
            pass
            
        return {
            'total_amount': sum(d.amount for d in donations),
            'donation_count': len(donations),
            'recurring_count': len([d for d in donations if d.is_recurring]),
            'average_amount': sum(d.amount for d in donations) / len(donations) if donations else 0
        }
