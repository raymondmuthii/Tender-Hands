# app/__init__.py
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from .config import Config
import logging
from logging.handlers import RotatingFileHandler
import os
import requests

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # add root route
    @app.route('/')
    def index():
        return jsonify({"message": "Tender Hands API"}), 200
    
    @app.route('/api/donations/callback', methods=['POST'])
    def mpesa_callback():
    # Safaricom sends JSON data to this endpoint
        data = request.json
        print("Received M-PESA Callback:", data)

    # Respond with acknowledgment
        response = {
            "ResultCode": 0,  # 0 means success in Safaricom's system
            "ResultDesc": "Callback received successfully"
        }
        return jsonify(response), 200
    
    # Register blueprints
    from .routes import auth, charity, donation, admin
    app.register_blueprint(auth)
    app.register_blueprint(charity)
    app.register_blueprint(donation)
    app.register_blueprint(admin)
    
    # Setup logging
    if not app.debug and not app.testing:
        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/donation_platform.log',
                                         maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.info('Donation Platform startup')
    
    # Global error handlers
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"error": "Resource not found"}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), 500
        
    return app
