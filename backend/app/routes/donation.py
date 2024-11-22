from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from app.models import Donation
from app.models import Charity
from app.services.mpesa import MpesaClient
from app import db

bp = Blueprint('donation', __name__, url_prefix='/api/donations')

mpesa_client = MpesaClient(
    consumer_key="your_key",
    consumer_secret="your_secret",
    pass_key="your_pass_key",
    short_code="your_shortcode"
)

@bp.route('/initiate', methods=['POST'])
def initiate_donation():
    data = request.json
    
    try:
        # Validate charity exists
        charity = Charity.query.get_or_404(data['charity_id'])
        
        # Initialize M-PESA STK Push
        mpesa_response = mpesa_client.initiate_stk_push(
            phone_number=data['phone_number'],
            amount=data['amount'],
            callback_url="your_callback_url",
            account_reference=f"DON{data['charity_id']}"
        )
        
        # Calculate next donation date for recurring donations
        next_donation_date = None
        if data.get('is_recurring'):
            if data['frequency'] == 'monthly':
                next_donation_date = datetime.utcnow() + timedelta(days=30)
            elif data['frequency'] == 'weekly':
                next_donation_date = datetime.utcnow() + timedelta(days=7)
        
        # Create donation record
        donation = Donation(
            amount=data['amount'],
            donor_id=data['donor_id'],
            charity_id=data['charity_id'],
            is_anonymous=data.get('is_anonymous', False),
            is_recurring=data.get('is_recurring', False),
            frequency=data.get('frequency'),
            next_donation_date=next_donation_date,
            status='pending'
        )
        
        db.session.add(donation)
        db.session.commit()
        
        return jsonify({
            "message": "Donation initiated successfully",
            "donation_id": donation.id,
            "mpesa_response": mpesa_response
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@bp.route('/callback', methods=['POST'])
def mpesa_callback():
    data = request.json
    
    try:
        # Extract M-PESA transaction details
        transaction_id = data.get('TransactionID')
        status = data.get('ResultCode')
        
        # Update donation status
        donation = Donation.query.filter_by(id=data.get('donation_id')).first()
        if donation:
            donation.status = 'completed' if status == '0' else 'failed'
            donation.transaction_id = transaction_id
            
            if donation.status == 'completed':
                # Update charity total donations
                charity = Charity.query.get(donation.charity_id)
                charity.total_donations += donation.amount
            
            db.session.commit()
            
        return jsonify({"message": "Callback processed successfully"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@bp.route('/history/<int:donor_id>', methods=['GET'])
def get_donation_history(donor_id):
    try:
        donations = Donation.query.filter_by(donor_id=donor_id).all()
        return jsonify({
            "donations": [{
                "id": d.id,
                "amount": d.amount,
                "charity_id": d.charity_id,
                "status": d.status,
                "is_recurring": d.is_recurring,
                "created_at": d.created_at.isoformat()
            } for d in donations]
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
