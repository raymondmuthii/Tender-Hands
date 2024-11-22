# app/services/mpesa.py
import requests
from datetime import datetime
import base64

class MpesaClient:
    def __init__(self, consumer_key, consumer_secret, pass_key, short_code):
        self.consumer_key = consumer_key
        self.consumer_secret = consumer_secret
        self.pass_key = pass_key
        self.short_code = short_code
        self.access_token = None
        
    def get_access_token(self):
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        auth = base64.b64encode(f"{self.consumer_key}:{self.consumer_secret}".encode()).decode()
        headers = {"Authorization": f"Basic {auth}"}
        
        response = requests.get(url, headers=headers)
        self.access_token = response.json()["access_token"]
        return self.access_token
        
    def initiate_stk_push(self, phone_number, amount, callback_url, account_reference):
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        
        password = base64.b64encode(f"{self.short_code}{self.pass_key}{timestamp}".encode()).decode()
        
        headers = {
            "Authorization": f"Bearer {self.get_access_token()}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "BusinessShortCode": self.short_code,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone_number,
            "PartyB": self.short_code,
            "PhoneNumber": phone_number,
            "CallBackURL": callback_url,
            "AccountReference": account_reference,
            "TransactionDesc": "Donation"
        }
        
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
