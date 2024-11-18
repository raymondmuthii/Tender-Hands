from datetime import datetime
from decimal import Decimal
from app import db
from backend.models.beneficiary import BaseModel

class Donation(BaseModel):
    __tablename__ = 'donations'
    
    # Payment Constants
    PAYMENT_METHODS = {
        'MPESA': 'mpesa',
        'CARD': 'card',
        'BANK': 'bank'
    }
    
    # Status Constants
    STATUSES = {
        'PENDING': 'pending',
        'COMPLETED': 'completed',
        'FAILED': 'failed'
    }
    
    # Frequency Constants
    FREQUENCIES = {
        'WEEKLY': 'weekly',
        'MONTHLY': 'monthly',
        'QUARTERLY': 'quarterly',
        'YEARLY': 'yearly'
    }
    
    # Required fields
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='KES')
    payment_method = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default=STATUSES['PENDING'])
    transaction_id = db.Column(db.String(100), unique=True)
    
    # Optional fields
    is_anonymous = db.Column(db.Boolean, default=False)
    is_recurring = db.Column(db.Boolean, default=False)
    recurring_frequency = db.Column(db.String(20))
    completed_at = db.Column(db.DateTime)
    
    # Foreign Keys
    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    # Relationships
    donor = db.relationship('User', back_populates='donations')
    charity = db.relationship('Charity', back_populates='donations')
    
    @property
    def formatted_amount(self) -> str:
        """Format amount with currency"""
        return f"{self.currency} {float(self.amount):,.2f}"
    
    def complete_donation(self) -> 'Donation':
        """Mark donation as completed"""
        self.status = self.STATUSES['COMPLETED']
        self.completed_at = datetime.utcnow()
        return self
    
    def fail_donation(self) -> 'Donation':
        """Mark donation as failed"""
        self.status = self.STATUSES['FAILED']
        return self
        
    @classmethod
    def get_charity_total(cls, charity_id: int) -> Decimal:
        """Get total donations for a charity"""
        return db.session.query(
            db.func.sum(cls.amount)
        ).filter_by(
            charity_id=charity_id,
            status=cls.STATUSES['COMPLETED']
        ).scalar() or Decimal('0')
    
    def __repr__(self) -> str:
        return f"<Donation {self.id}: {self.formatted_amount} to {self.charity.name}>"
