# app/models/charity.py
from app import db
from app.models import BaseModel

class Charity(BaseModel):
    __tablename__ = 'charities'
    
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    mission = db.Column(db.Text)
    logo_url = db.Column(db.String(255))
    cover_image = db.Column(db.String(255))
    website = db.Column(db.String(255))
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    category = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, active, inactive
    featured = db.Column(db.Boolean, default=False)
    
    # Foreign Keys
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    # Relationships
    donations = db.relationship('Donation', backref='charity', lazy=True)
    stories = db.relationship('Story', backref='charity', lazy=True)
