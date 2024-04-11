# Download the helper library from pip3 install twilio
import os
from twilio.rest import Client

# Set environment variables for your credentials
# Read more at http://twil.io/secure
account_sid = "AC205fa8500fab664d8141c70b800c7861"
auth_token = "c901359244fe218f53c4262b22517da4"
verify_sid = "VA4bce10f8b4a282f4c1bb3a3e9740673c"
verified_number = ("+917880789486")

client = Client(account_sid, auth_token)

verification = client.verify.v2.services(verify_sid) \
  .verifications \
  .create(to=verified_number, channel="sms")
print(verification.status)

otp_code = input("Please enter the OTP:")

verification_check = client.verify.v2.services(verify_sid) \
  .verification_checks \
  .create(to=verified_number, code=otp_code)
print(verification_check.status)