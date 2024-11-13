# i added this but im not sure if its needed
# app/schemas/beneficiary.py
from marshmallow import fields, validate
from . import BaseSchema
from ..models.beneficiary import Beneficiary

class BeneficiarySchema(BaseSchema):
    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    description = fields.String()
    contact_info = fields.String()
    status = fields.String(validate=validate.OneOf(['active', 'inactive']))
    
    # Foreign keys
    charity_id = fields.Integer(required=True)
    
    # Nested relationships
    charity = fields.Nested('CharitySchema', only=('id', 'name'), dump_only=True)
    inventory_received = fields.Nested('InventorySchema', many=True, exclude=('beneficiary',), dump_only=True)

    @post_load
    def make_beneficiary(self, data, **kwargs):
        return Beneficiary(**data)
