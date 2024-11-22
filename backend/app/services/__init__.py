# app/services/__init__.py
from .mpesa import MpesaClient

# Export the MpesaClient for use in other modules
mpesa = MpesaClient
