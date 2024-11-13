from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class BaseModel(db.Model):
    """Base model class to add common columns to all models"""
    __abstract__ = True
    
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class User(BaseModel):
    __tablename__ = 'users'
    
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user')  # user, admin, charity_admin
    is_active = db.Column(db.Boolean, default=True)
    profile_image = db.Column(db.String(255))
    
    # Relationships
    donations = db.relationship('Donation', back_populates='donor', lazy=True)
    managed_charity = db.relationship('Charity', backref='admin', lazy=True)
    stories = db.relationship('Story', back_populates='author', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Charity(BaseModel):
    __tablename__ = 'charities'
    
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    mission = db.Column(db.Text)
    logo_url = db.Column(db.String(255))
    cover_image = db.Column(db.String(255))
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    password_hash = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50))
    status = db.Column(db.String(20), default='pending')  # pending, active, inactive
    featured = db.Column(db.Boolean, default=False)
    
    # Foreign Keys
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    # Relationships
    donations = db.relationship('Donation', back_populates='charity', lazy=True)
    beneficiaries = db.relationship('Beneficiary', back_populates='charity', lazy=True)
    stories = db.relationship('Story', back_populates='charity', lazy=True)
    inventory_items = db.relationship('Inventory', back_populates='charity', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def total_donations(self):
        return sum(donation.amount for donation in self.donations)

class Donation(BaseModel):
    __tablename__ = 'donations'
    
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='USD')
    status = db.Column(db.String(20), default='pending')  # pending, completed, failed
    transaction_id = db.Column(db.String(100), unique=True)
    is_anonymous = db.Column(db.Boolean, default=False)
    is_recurring = db.Column(db.Boolean, default=False)
    recurring_frequency = db.Column(db.String(20))  # monthly, quarterly, yearly
    
    # Foreign Keys
    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    # Relationships
    donor = db.relationship('User', back_populates='donations')
    charity = db.relationship('Charity', back_populates='donations')

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

class Story(BaseModel):
    __tablename__ = 'stories'
    
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    status = db.Column(db.String(20), default='draft')  # draft, published, archived
    featured = db.Column(db.Boolean, default=False)
    view_count = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)
    shares = db.Column(db.Integer, default=0)
    
    # Foreign Keys
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    # Relationships
    author = db.relationship('User', back_populates='stories')
    charity = db.relationship('Charity', back_populates='stories')

class Inventory(BaseModel):
    __tablename__ = 'inventory'
    
    item_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(20))  # e.g., 'pieces', 'kg', 'boxes'
    status = db.Column(db.String(20), default='in_stock')  # in_stock, allocated, distributed
    
    # Foreign Keys
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    beneficiary_id = db.Column(db.Integer, db.ForeignKey('beneficiaries.id'))
    
    # Relationships
    charity = db.relationship('Charity', back_populates='inventory_items')
    beneficiary = db.relationship('Beneficiary', back_populates='inventory_received')
