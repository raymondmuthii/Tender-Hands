# app/models/user.py
from app import db
from app.models import BaseModel
from werkzeug.security import generate_password_hash, check_password_hash

class User(BaseModel):
    __tablename__ = 'users'
    
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255))
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), default='user')  # user, admin, charity_admin
    is_active = db.Column(db.Boolean, default=True)
    profile_image = db.Column(db.String(255))
    
    # Relationships
    donations = db.relationship('Donation', backref='donor', lazy=True)
    stories = db.relationship('Story', backref='author', lazy=True)
    managed_charity = db.relationship('Charity', backref='admin', lazy=True)
    
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
