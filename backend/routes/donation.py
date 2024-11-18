from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from decimal import Decimal
from models.donation import Donation
from models.user import User
from models.charity import Charity
from services.donation_service import DonationService

donation_bp = Blueprint('donation', __name__)

@donation_bp.route('/create', methods=['POST'])
@jwt_required()
def create_donation():
    try:
        # Get current user from JWT token
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Get data from request
        data = request.get_json()
        charity_id = data.get('charity_id')
        amount = data.get('amount')
        is_recurring = data.get('is_recurring', False)
        recurring_frequency = data.get('recurring_frequency')

        # Validate charity
        charity = Charity.query.get(charity_id)
        if not charity:
            return jsonify({'error': 'Charity not found'}), 404

        # Create donation
        donation = DonationService.create_donation(
            user_id=user.id,
            charity_id=charity.id,
            amount=Decimal(str(amount)),
            payment_method=Donation.PAYMENT_METHODS['MPESA'],
            is_recurring=is_recurring,
            recurring_frequency=Donation.FREQUENCIES.get(recurring_frequency.upper()) if recurring_frequency else None
        )

        # Complete the donation (you might want to handle this differently based on your payment flow)
        DonationService.complete_donation(donation.id)

        # Get updated charity total
        total = DonationService.get_charity_total(charity.id)

        return jsonify({
            'message': 'Donation successful',
            'donation': {
                'id': donation.id,
                'amount': donation.formatted_amount,
                'charity': charity.name,
                'status': donation.status
            },
            'charity_total': f"KES {total:,.2f}"
        }), 201

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
