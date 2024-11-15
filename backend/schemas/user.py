# app/schemas/user.py
from marshmallow import fields, validate
from . import BaseSchema
from ..models.beneficiary import User
import marshmallow as ma
class UserSchema(BaseSchema):
    name = fields.String(required=True, validate=validate.Length(min=2, max=100))
    email = fields.Email(required=True)
    password = fields.String(load_only=True, required=True, validate=validate.Length(min=6))
    role = fields.String(validate=validate.OneOf(['user', 'admin', 'charity_admin']))
    is_active = fields.Boolean()
    profile_image = fields.String()
    
    # Nested relationships
    donations = fields.Nested('DonationSchema', many=True, exclude=('donor',), dump_only=True)
    managed_charity = fields.Nested('CharitySchema', exclude=('admin',), dump_only=True)
    stories = fields.Nested('StorySchema', many=True, exclude=('author',), dump_only=True)

    @ma.post_load
    def make_user(self, data, **kwargs):
        return User(**data)
