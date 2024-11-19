from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os
from services.donation_service import DonationService
from database import db  # Import db from the new file

load_dotenv()

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
    
    from routes.auth import auth_bp
    from routes.charity import charity_bp
    from routes.donation import donation_bp
    from routes.story import story_bp
    from routes.user import user_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(charity_bp, url_prefix='/api/charities')
    app.register_blueprint(donation_bp, url_prefix='/api/donations')
    app.register_blueprint(story_bp, url_prefix='/api/stories')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    
    with app.app_context():
        db.create_all()
    
    return app
