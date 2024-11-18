from marshmallow import Schema, fields, validate, post_load, validates, ValidationError
from datetime import datetime

class BaseSchema(Schema):
    id = fields.Integer(dump_only=True)
    
    # Created at timestamp defaults to current time if not provided
    created_at = fields.DateTime(dump_only=True, missing=datetime.utcnow)
    
    # Updated at timestamp,defaults to current time if not provided
    updated_at = fields.DateTime(dump_only=True, missing=datetime.utcnow)
    
    @validates('created_at')
    def validate_created_at(self, value):
        if value and not isinstance(value, datetime):
            raise ValidationError('Invalid datetime format for created_at.')

    @validates('updated_at')
    def validate_updated_at(self, value):
        if value and not isinstance(value, datetime):
            raise ValidationError('Invalid datetime format for updated_at.')

    # Optionally, add @post_load method to add logic after loading data (if necessary)
    @post_load
    def process_data(self, data, **kwargs):
        # You can add additional data processing here if needed
        return data

    class Meta:
        # Optional: Custom error messages for field validation
        error_messages = {
            'required': 'This field is required.',
            'null': 'This field cannot be null.',
            'validator_failed': 'Invalid data provided.'
        }
