from marshmallow import fields, validate, post_load
from .inventory import BaseSchema
from backend.models.beneficiary import Inventory
import marshmallow as ma
class InventorySchema(BaseSchema):
    # Item name with length 2-100
    item_name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    
    # Item description
    description = fields.String()
    
    # Quantity, required and must not be negative
    quantity = fields.Integer(required=True, validate=validate.Range(min=0))
    
    # Status
    status = fields.String(validate=validate.OneOf(['in_stock', 'allocated', 'distributed']))
    
    # Foreign keys
    charity_id = fields.Integer(required=True)
    beneficiary_id = fields.Integer()
    
    # Related charity and beneficiary data, read-only
    charity = fields.Nested('CharitySchema', only=('id', 'name'), dump_only=True)
    beneficiary = fields.Nested('BeneficiarySchema', only=('id', 'name'), dump_only=True)

<<<<<<< HEAD
    @ma.post_load
=======
    # Create Inventory instance after loading data
    @post_load
>>>>>>> 8afdb2824e2bac62beb241e990dda0b27d3687fe
    def make_inventory(self, data, **kwargs):
        return Inventory(**data)
