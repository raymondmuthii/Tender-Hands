from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class BaseModel(db.Model):
    """Base model class to add common columns to all models"""
    __abstract__ = True
    
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now(datetime.timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(datetime.timezone.utc), onupdate=datetime.now(datetime.timezone.utc))

class Beneficiary(BaseModel):
    __tablename__ = 'beneficiaries'
    
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    contact_info = db.Column(db.String(255))
    status = db.Column(db.String(20), default='active')
    
    # Foreign Keys
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    # Relationships
    charity = db.relationship('Charity', back_populates='beneficiaries')
    inventory_received = db.relationship('Inventory', back_populates='beneficiary')


