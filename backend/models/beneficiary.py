
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum
from datetime import datetime, timezone

db = SQLAlchemy()

class BaseModel(db.Model):
    """Base model class to add common columns to all models"""
    __abstract__ = True
    
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

class Beneficiary(BaseModel):
    __tablename__ = 'beneficiaries'
    
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    contact_info = db.Column(db.String(255), nullable=False)
    status = db.Column(Enum('active', 'inactive', name='beneficiary_status'), default='active', nullable=False)
    
    # Foreign Keys
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    # Relationships
    charity = db.relationship('Charity', back_populates='beneficiaries')
    inventory_received = db.relationship(
        'Inventory',
        back_populates='beneficiary',
        cascade='all, delete-orphan'
    )