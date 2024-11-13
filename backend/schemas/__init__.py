# app/schemas/__init__.py
from marshmallow import Schema, fields, validate, post_load, validates, ValidationError
from datetime import datetime

class BaseSchema(Schema):
    #base schema with common fields
    id = fields.Integer(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
