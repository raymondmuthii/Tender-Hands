from flask import Flask
from dotenv import load_dotenv
import os

# Import the extensions from a single source
from backend.extensions import db, migrate, ma, jwt, cors, mail, init_app

def create_app(config_name=None):
    app = Flask(__name__)
    load_dotenv()
    
    # Configuration
    app.config.from_object(
        config_name
    )
    
    
    # Use the init_app function from extensions to initialize all extensions
    init_app(app)
    
    with app.app_context():
        # Import routes
        from backend.routes import auth_bp, charity_bp, donation_bp, story_bp, user_bp, admin_bp, charity_admin_bp
        
        # Register blueprints
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        app.register_blueprint(charity_bp, url_prefix='/api/charities')
        app.register_blueprint(donation_bp, url_prefix='/api/donations')
        app.register_blueprint(story_bp, url_prefix='/api/stories')
        app.register_blueprint(user_bp, url_prefix='/api/users')
        app.register_blueprint(admin_bp, url_prefix='/api/admin')
        app.register_blueprint(charity_admin_bp, url_prefix='/api/charity-admin')
        
        # Create database tables
        db.create_all()
    
    return app