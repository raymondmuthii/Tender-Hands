# app/schemas/charity.py
from marshmallow import fields, validate
from . import BaseSchema
from ..models.charity import Charity

class CharitySchema(BaseSchema):
    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    description = fields.String(required=True)
    mission = fields.String()
    logo_url = fields.String()
    cover_image = fields.String()
    email = fields.Email(required=True)
    phone = fields.String(validate=validate.Length(max=20))
    address = fields.String()
    password = fields.String(load_only=True, validate=validate.Length(min=6))
    category = fields.String()
    status = fields.String(validate=validate.OneOf(['pending', 'active', 'inactive']))
    featured = fields.Boolean()
    
    # Foreign keys
    admin_id = fields.Integer()
    
    # Nested relationships
    admin = fields.Nested('UserSchema', only=('id', 'name', 'email'), dump_only=True)
    donations = fields.Nested('DonationSchema', many=True, exclude=('charity',), dump_only=True)
    beneficiaries = fields.Nested('BeneficiarySchema', many=True, exclude=('charity',), dump_only=True)
    stories = fields.Nested('StorySchema', many=True, exclude=('charity',), dump_only=True)
    inventory_items = fields.Nested('InventorySchema', many=True, exclude=('charity',), dump_only=True)

    @post_load
    def make_charity(self, data, **kwargs):
        return Charity(**data)
