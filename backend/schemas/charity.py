from marshmallow import fields, validate, post_load
from . import BaseSchema
from models import Charity

class CharitySchema(BaseSchema):
    # Required name with length constraints
    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    
    # Required description with max length of 1000 characters
    description = fields.String(required=True, validate=validate.Length(max=1000))
    
    # Mission statement
    mission = fields.String(validate=validate.Length(max=1000))
    
    # URLs for logo and cover images
    logo_url = fields.Url(allow_none=True, missing=None)
    cover_image = fields.Url(allow_none=True, missing=None)
    
    # Contact information
    email = fields.Email(required=True)
    phone = fields.String(validate=validate.Length(max=20))
    address = fields.String()
    
    # Account-related fields
    password = fields.String(load_only=True, required=True, validate=validate.Length(min=6))
    
    # Category, optional
    category = fields.String()
    
    # Status field with default 'pending' and predefined choices
    status = fields.String(validate=validate.OneOf(['pending', 'active', 'inactive']), missing='pending')
    
    # Featured flag, defaults to False
    featured = fields.Boolean(missing=False)
    
    # Foreign key for the admin
    admin_id = fields.Integer()
    
    # Nested relationships, read-only
    admin = fields.Nested('UserSchema', only=('id', 'name', 'email'), dump_only=True)
    donations = fields.Nested('DonationSchema', many=True, exclude=('charity',), dump_only=True)
    beneficiaries = fields.Nested('BeneficiarySchema', many=True, exclude=('charity',), dump_only=True)
    stories = fields.Nested('StorySchema', many=True, exclude=('charity',), dump_only=True)
    inventory_items = fields.Nested('InventorySchema', many=True, exclude=('charity',), dump_only=True)

    # Method to create Charity instance after loading data
    @post_load
    def make_charity(self, data, **kwargs):
        return Charity(**data)
    
    # Meta class for custom error messages
    class Meta:
        error_messages = {
            'required': 'This field is required.',
            'null': 'This field cannot be null.',
            'validator_failed': 'Invalid data provided.'
        }
