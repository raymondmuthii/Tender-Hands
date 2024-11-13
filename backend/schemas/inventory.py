# app/schemas/inventory.py
from marshmallow import fields, validate, post_load
from .inventory import BaseSchema
from models import Inventory

class InventorySchema(BaseSchema):
    item_name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    description = fields.String()
    quantity = fields.Integer(required=True, validate=validate.Range(min=0))
    status = fields.String(validate=validate.OneOf(['in_stock', 'allocated', 'distributed']))
    
    # Foreign keys
    charity_id = fields.Integer(required=True)
    beneficiary_id = fields.Integer()
    
    # Nested relationships
    charity = fields.Nested('CharitySchema', only=('id', 'name'), dump_only=True)
    beneficiary = fields.Nested('BeneficiarySchema', only=('id', 'name'), dump_only=True)

    @post_load
    def make_inventory(self, data, **kwargs):
        return Inventory(**data)
