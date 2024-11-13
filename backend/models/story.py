# app/models/story.py
from app import db
from app.models import BaseModel

class Story(BaseModel):
    __tablename__ = 'stories'
    
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    status = db.Column(db.String(20), default='draft')  # draft, published, archived
    featured = db.Column(db.Boolean, default=False)
    view_count = db.Column(db.Integer, default=0)
    
    # Foreign Keys
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    # Additional fields for engagement
    likes = db.Column(db.Integer, default=0)
    shares = db.Column(db.Integer, default=0)
