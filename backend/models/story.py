from datetime import datetime
from app import db
from .beneficiary import BaseModel

class Story(BaseModel):
    """
    Story model for charity impact stories and updates
    """
    __tablename__ = 'stories'
    
    # Status Constants
    STATUS_DRAFT = 'draft'
    STATUS_PUBLISHED = 'published'
    STATUS_ARCHIVED = 'archived'
    
    # Column Definitions
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    status = db.Column(db.String(20), default=STATUS_DRAFT)
    featured = db.Column(db.Boolean, default=False)
    
    # Engagement Metrics
    view_count = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)
    shares = db.Column(db.Integer, default=0)
    
    # Publishing Info
    published_at = db.Column(db.DateTime)
    
    # Foreign Keys
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    # Relationships
    author = db.relationship('User', back_populates='stories')
    charity = db.relationship('Charity', back_populates='stories')

    def __repr__(self):
        return f'<Story {self.title}>'

    @property
    def is_published(self):
        """Check if story is published"""
        return self.status == self.STATUS_PUBLISHED

    @property
    def is_draft(self):
        """Check if story is draft"""
        return self.status == self.STATUS_DRAFT

    @property
    def reading_time(self):
        """Calculate estimated reading time in minutes"""
        words_per_minute = 200
        word_count = len(self.content.split())
        minutes = word_count / words_per_minute
        return max(1, round(minutes))

    def publish(self):
        """Publish the story"""
        self.status = self.STATUS_PUBLISHED
        self.published_at = datetime.utcnow()
        return self

    def archive(self):
        """Archive the story"""
        self.status = self.STATUS_ARCHIVED
        return self

    def increment_view(self):
        """Increment view count"""
        self.view_count += 1
        return self

    def increment_likes(self):
        """Increment likes count"""
        self.likes += 1
        return self

    def increment_shares(self):
        """Increment shares count"""
        self.shares += 1
        return self

    def toggle_featured(self):
        """Toggle featured status"""
        self.featured = not self.featured
        return self

    @classmethod
    def get_featured(cls):
        """Get all featured stories"""
        return cls.query.filter_by(
            featured=True, 
            status=cls.STATUS_PUBLISHED
        ).order_by(cls.created_at.desc()).all()

    @classmethod
    def get_by_charity(cls, charity_id):
        """Get all published stories for a charity"""
        return cls.query.filter_by(
            charity_id=charity_id,
            status=cls.STATUS_PUBLISHED
        ).order_by(cls.created_at.desc()).all()

    @classmethod
    def get_trending(cls, limit=5):
        """Get trending stories based on engagement"""
        return cls.query.filter_by(
            status=cls.STATUS_PUBLISHED
        ).order_by(
            (cls.views + cls.likes + cls.shares).desc()
        ).limit(limit).all()

    def to_dict(self):
        """Convert story to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'image_url': self.image_url,
            'status': self.status,
            'featured': self.featured,
            'view_count': self.view_count,
            'likes': self.likes,
            'shares': self.shares,
            'reading_time': self.reading_time,
            'author_id': self.author_id,
            'charity_id': self.charity_id,
            'published_at': self.published_at.isoformat() if self.published_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
