# app/schemas/story.py
from marshmallow import fields, validate
from . import BaseSchema
from ..models.story import Story
import marshmallow as ma
class StorySchema(BaseSchema):
    title = fields.String(required=True, validate=validate.Length(min=3, max=200))
    content = fields.String(required=True)
    image_url = fields.String()
    status = fields.String(validate=validate.OneOf(['draft', 'published', 'archived']))
    featured = fields.Boolean()
    view_count = fields.Integer(dump_only=True)
    likes = fields.Integer(dump_only=True)
    shares = fields.Integer(dump_only=True)
    
    # Foreign keys
    author_id = fields.Integer(required=True)
    charity_id = fields.Integer(required=True)
    
    # Nested relationships
    author = fields.Nested('UserSchema', only=('id', 'name'), dump_only=True)
    charity = fields.Nested('CharitySchema', only=('id', 'name'), dump_only=True)

    @ma.post_load
    def make_story(self, data, **kwargs):
        return Story(**data)
