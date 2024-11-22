# app/config.py
import os
from datetime import timedelta

class Config:
    # Flask Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
    
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///donation_platform.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # M-PESA Configuration
    MPESA_CONSUMER_KEY = os.environ.get('MPESA_CONSUMER_KEY')
    MPESA_CONSUMER_SECRET = os.environ.get('MPESA_CONSUMER_SECRET')
    MPESA_PASS_KEY = os.environ.get('MPESA_PASS_KEY')
    MPESA_SHORT_CODE = os.environ.get('MPESA_SHORT_CODE')
    MPESA_CALLBACK_URL = os.environ.get('MPESA_CALLBACK_URL')
    
    # CORS Configuration
    CORS_HEADERS = 'Content-Type'
