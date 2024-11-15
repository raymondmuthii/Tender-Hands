#app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os
from services.donation_service import DonationService
from database import db

load_dotenv()

db = SQLAlchemy()
ma = Marshmallow()
jwt = JWTManager()
migrate = Migrate()

def create_app(config_name=None):
    app = Flask(__name__)
    
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    from .routes.auth import auth_bp
    from .routes.charity import charity_bp
    from .routes.donation import donation_bp
    from .routes.story import story_bp
    from .routes.auth import user_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(charity_bp, url_prefix='/api/charities')
    app.register_blueprint(donation_bp, url_prefix='/api/donations')
    app.register_blueprint(story_bp, url_prefix='/api/stories')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    
    with app.app_context():
        db.create_all()

from services.donation_service import DonationService

try:
    # Create a donation
    donation = DonationService.create_donation(
        user_id=user.id,
        charity_id=charity.id,
        amount=Decimal('1000.00'),
        payment_method=Donation.PAYMENT_MPESA,
        is_recurring=True,
        recurring_frequency=Donation.FREQUENCY_MONTHLY
    )
    
    # Complete the donation
    DonationService.complete_donation(donation.id)
    
    # Get charity total
    total = DonationService.get_charity_total(charity.id)
    print(f"Donation amount: {donation.formatted_amount}")
    print(f"Charity total: KES {total:,.2f}")
    
except ValueError as e:
    print(f"Error: {str(e)}")
