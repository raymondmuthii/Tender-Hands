from marshmallow import fields, validate, post_load
from . import BaseSchema
from ..models.story import Story
import marshmallow as ma
class StorySchema(BaseSchema):
    # Title with 3-200 characters
    title = fields.String(required=True, validate=validate.Length(min=3, max=200))
    
    # Content
    content = fields.String(required=True)
    
    # Image URL
    image_url = fields.Url(allow_none=True)
    
    status = fields.String(validate=validate.OneOf(['draft', 'published', 'archived']))
    featured = fields.Boolean(missing=False)
    
    # Read-only fields
    view_count = fields.Integer(dump_only=True)
    likes = fields.Integer(dump_only=True)
    shares = fields.Integer(dump_only=True)
    
    # Foreign keys
    author_id = fields.Integer(required=True)
    charity_id = fields.Integer(required=True)
    
    # Related author and charity data
    author = fields.Nested('UserSchema', only=('id', 'name'), dump_only=True)
    charity = fields.Nested('CharitySchema', only=('id', 'name'), dump_only=True)

    @ma.post_load
    def make_story(self, data, **kwargs):
        return Story(**data)
