# You Logged In but Can't Find Your Token (Here is Why)

🟡 **[To be able to follow along, make sure to watch our AWS Cognito Tutorial first](https://youtu.be/hDC4V1uUFkY)**

🔴 **[Watch the full tutorial on YouTube](https://youtube.com/your-video-link)**

## Cognito cURL Generator

This repository includes a Python script that generates cURL commands for AWS Cognito authentication. The script helps you obtain authentication tokens by creating the proper cURL request with the required SECRET_HASH.

### Usage

1. **Run the script:**
   ```bash
   python3 cognito_curl_generator.py
   ```

2. **Provide credentials:**
   - The script will prompt for AWS region, email, password, client ID, and client secret
   - Alternatively, create a `credentials.json` file with your credentials:
   ```json
   {
     "region": "us-east-1",
     "email": "your-email@example.com",
     "password": "your-password",
     "client_id": "your-client-id",
     "client_secret": "your-client-secret"
   }
   ```

3. **Execute the generated cURL:**
   - The script saves the cURL command to `cognito_curl_command.txt`
   - Copy and run the command in your terminal to get your authentication token

### Output

The generated cURL command will authenticate with AWS Cognito and return a response containing:
- `AccessToken`
- `IdToken`
- `RefreshToken`

### Import to Postman

1. **Copy the cURL command:**
   - Open `cognito_curl_command.txt` and copy the entire cURL command

2. **Import in Postman:**
   - Open Postman
   - Click "Import" button (top left)
   - Paste the cURL command
   - Click "Continue" then "Import"

3. **Execute the request:**
   - The imported request will appear in your Postman collection
   - Click "Send" to execute and receive your authentication tokens

---

**⚠️ SECURITY DISCLAIMER**

This code is provided as-is for educational and development purposes. While efforts have been made to ensure correctness, it is **your responsibility** to:
- Review and validate the code before use
- Ensure it meets your security requirements
- Test thoroughly in a non-production environment
- Never commit credentials to version control
- Follow your organization's security policies

**DO NOT use this code in production without proper security review and testing.**