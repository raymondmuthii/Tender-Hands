from marshmallow import fields, validate, post_load
from . import BaseSchema
from ..models.beneficiary import Beneficiary

class BeneficiarySchema(BaseSchema):
    # Name with length constraints
    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    
    # Description with max length of 1000 characters
    description = fields.String(validate=validate.Length(max=1000))
    
    # Contact information
    contact_info = fields.String(validate=validate.Length(max=255))
    
    # Status field
    status = fields.String(validate=validate.OneOf(['active', 'inactive']), missing='active')
    
    # Foreign key for the charity
    charity_id = fields.Integer(required=True)
    
    # Nested relationships
    charity = fields.Nested('CharitySchema', only=('id', 'name'), dump_only=True)
    inventory_received = fields.Nested('InventorySchema', many=True, exclude=('beneficiary',), dump_only=True)

    # Method to create Beneficiary instance after loading data
    @post_load
    def make_beneficiary(self, data, **kwargs):
        return Beneficiary(**data)
    
    # Meta class for custom error messages
    class Meta:
        error_messages = {
            'required': 'This field is required.',
            'null': 'This field cannot be null.',
            'validator_failed': 'Invalid data provided.'
        }
