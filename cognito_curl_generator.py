#!/usr/bin/env python3
import hmac, hashlib, base64, json, os

creds = {}
if os.path.exists("credentials.json"):
    with open("credentials.json") as f:
        creds = json.load(f)

region = creds.get("region") or input("Enter AWS region: ")
email = creds.get("email") or input("Enter email: ")
password = creds.get("password") or input("Enter password: ")
client_id = creds.get("client_id") or input("Enter client ID: ")
client_secret = creds.get("client_secret") or input("Enter client secret: ")

message = (email + client_id).encode("utf-8")
key = client_secret.encode("utf-8")
secret_hash = base64.b64encode(hmac.new(key, message, digestmod=hashlib.sha256).digest()).decode()

curl_command = f"""curl --location --request POST 'https://cognito-idp.{region}.amazonaws.com/' \\
    --header 'X-Amz-Target: AWSCognitoIdentityProviderService.InitiateAuth' \\
    --header 'Content-Type: application/x-amz-json-1.1' \\
    --data-raw '{{
        "AuthParameters": {{
            "USERNAME": "{email}",
            "PASSWORD": "{password}",
            "SECRET_HASH": "{secret_hash}"
        }},
        "AuthFlow": "USER_PASSWORD_AUTH",
        "ClientId": "{client_id}"
    }}'"""

with open("cognito_curl_command.txt", "w") as f:
    f.write(curl_command)

print("Curl command saved to cognito_curl_command.txt")