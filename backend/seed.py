# seed.py
from app import create_app, db
from app.models import User
from app.models import Charity
from app.models import Donation
from app.models import Story
from werkzeug.security import generate_password_hash
from datetime import datetime

def seed_database():
    app = create_app()
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Create admin user
        admin = User(
            email='admin@example.com',
            password_hash=generate_password_hash('admin123'),
            phone_number='+254700000000',
            full_name='System Admin',
            role='admin',
            created_at=datetime.utcnow()
        )

        # Create sample charity admin
        charity_admin = User(
            email='charity@example.com',
            password_hash=generate_password_hash('charity123'),
            phone_number='+254700000001',
            full_name='Charity Manager',
            role='charity_admin',
            created_at=datetime.utcnow()
        )

        # Create sample donor
        donor = User(
            email='donor@example.com',
            password_hash=generate_password_hash('donor123'),
            phone_number='+254700000002',
            full_name='Test Donor',
            role='donor',
            created_at=datetime.utcnow()
        )

        # Create sample charities
        charity1 = Charity(
            name='Children Education Fund',
            description='Supporting education for underprivileged children',
            admin_id=2,  # Will be charity_admin's ID
            status='approved',
            total_donations=0.0,
            target_amount=1000000.0,
            created_at=datetime.utcnow()
        )

        charity2 = Charity(
            name='Medical Aid Foundation',
            description='Providing medical assistance to communities in need',
            admin_id=2,  # Will be charity_admin's ID
            status='pending',
            total_donations=0.0,
            target_amount=500000.0,
            created_at=datetime.utcnow()
        )

        # Create sample story
        story = Story(
            charity_id=1,  # Will be charity1's ID
            title='First Success Story',
            content='We helped 100 children access education this month',
            created_at=datetime.utcnow()
        )

        # Add all to session
        db.session.add(admin)
        db.session.add(charity_admin)
        db.session.add(donor)
        db.session.add(charity1)
        db.session.add(charity2)
        db.session.add(story)

        # Commit changes
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()
