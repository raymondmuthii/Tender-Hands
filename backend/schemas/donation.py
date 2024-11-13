# app/schemas/donation.py
from marshmallow import fields, validate
from . import BaseSchema
from ..models.donation import Donation

class DonationSchema(BaseSchema):
    amount = fields.Decimal(required=True, places=2)
    currency = fields.String(validate=validate.Length(equal=3))
    status = fields.String(validate=validate.OneOf(['pending', 'completed', 'failed']))
    transaction_id = fields.String()
    is_anonymous = fields.Boolean()
    is_recurring = fields.Boolean()
    recurring_frequency = fields.String(validate=validate.OneOf(['monthly', 'quarterly', 'yearly']))
    
    # Foreign keys
    donor_id = fields.Integer(required=True)
    charity_id = fields.Integer(required=True)
    
    # Nested relationships
    donor = fields.Nested('UserSchema', only=('id', 'name'), dump_only=True)
    charity = fields.Nested('CharitySchema', only=('id', 'name'), dump_only=True)

    @post_load
    def make_donation(self, data, **kwargs):
        return Donation(**data)
