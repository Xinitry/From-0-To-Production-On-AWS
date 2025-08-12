# Cognito Settings You Overlooked (Complete Setup Guide)

🔴 **[Watch the full tutorial on YouTube](https://youtu.be/hDC4V1uUFkY)**

## 🔧 Project Overview

This is a **minimal working demo** of implementing a login flow using **AWS Cognito Hosted UI** with **OAuth 2.0 Implicit Flow**.

- Uses Amazon Cognito’s built-in login screen
- Retrieves tokens (`access_token`, `id_token`, `refresh_token`) from the URL
- Stores them securely in cookies
- Fetches user attributes from Cognito using the AWS SDK
- Allows the user to log out (clearing tokens)

---

## 📄 File Structure

```bash

├── README.md                       # You are here
└── Cognito Login Page Example/
    ├── index.html                  # The frontend layout and buttons
    └── script.js                   # Core logic for authentication and session handling
````

---

## 📁 index.html – Layout & Structure

### HTML Breakdown

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cognito Login Demo</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1692.0.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        #logout-btn { display: none; margin-top: 10px; }
        #message { margin-top: 20px; font-weight: bold; }
    </style>
</head>
<body>
    <button id="login-btn">Login</button>
    <button id="logout-btn">Logout</button>
    <div id="message"></div>
    <pre id="userdata"></pre>
    <pre id="id_token"></pre>
    <pre id="access_token"></pre>
    <script src="script.js"></script>
</body>
</html>
```

### Key Elements

* **Login Button** (`#login-btn`): Triggers redirect to Cognito login page.
* **Logout Button** (`#logout-btn`): Clears tokens and resets UI.
* **#message**: Displays login/logout status messages.
* **#userdata**: Shows user profile (name, email, etc.) from Cognito.
* **#id\_token / #access\_token**: Shows token values for debugging (do not expose in production).

---

## 🧠 script.js – Authentication Logic Explained

---

### 🔗 1. Cognito Hosted UI URL

```js
const COGNITO_LOGIN_URL = "https://your-domain.auth.region.amazoncognito.com/login?client_id=...&redirect_uri=...&response_type=token&scope=...";
```

* This is the **OAuth login endpoint** for your Cognito User Pool.
* Redirects users to Cognito login screen.
* The `redirect_uri` must match what's configured in Cognito.

---

### 📦 2. Parsing the Tokens from the URL

```js
function parseTokenFromURL() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return {
        access_token: params.get("access_token"),
        id_token: params.get("id_token"),
        refresh_token: params.get("refresh_token")
    };
}
```

* After successful login, Cognito redirects the user back with tokens in the URL.
* This function extracts them.

---

### 🍪 3. Cookie Helpers

```js
function setCookie(name, value, hours) { ... }
function getCookie(name) { ... }
function deleteCookie(name) { ... }
function clearAllCookies() { ... }
```

* Used to persist the `access_token`, `id_token`, and `refresh_token` in the browser.
* Cookies are:

  * **Secure**
  * **HTTP only** (where applicable)
  * **Strict SameSite**

---

### 📢 4. Messaging & Display

```js
function showMessage(message) { ... }
function displayUserData(dataDict) { ... }
```

* Updates the page with status and user info.
* Dumps token values and Cognito attributes into `<pre>` tags.

---

### 👤 5. Fetching Cognito User Info

```js
function fetchCognitoUser(accessToken) {
    AWS.config.region = 'us-east-1';
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const params = { AccessToken: accessToken };

    cognito.getUser(params, function(err, data) {
        if (err) { ... } else {
            // Build user dictionary and display
        }
    });
}
```

* Calls AWS Cognito using the **Access Token** to retrieve user profile attributes.
* Requires correct region and AWS SDK loaded.

---

### 🔁 6. Login Flow Handler

```js
function handleLoginFlow() {
    const { access_token, id_token, refresh_token } = parseTokenFromURL();

    if (access_token && id_token) {
        setCookie(...);
        fetchCognitoUser(access_token);
        window.history.replaceState(...);
        toggleButtons();
    } else if (getCookie("access_token")) {
        fetchCognitoUser(getCookie("access_token"));
        toggleButtons();
    }
}
```

* If tokens exist in URL: extract → store in cookies → get user info
* If no tokens but cookies exist: try to use existing session
* Cleans up the URL using `replaceState()` so tokens don’t appear

---

### 🧼 7. jQuery + UI Logic

```js
$(document).ready(function () {
    handleLoginFlow();

    $("#login-btn").on("click", function () {
        window.location.href = COGNITO_LOGIN_URL;
    });

    $("#logout-btn").on("click", function () {
        clearAllCookies();
        showMessage("You are now logged out.");
        $("#userdata").text("");
        $("#id_token").text("");
        $("#access_token").text("");
        $("#login-btn").show();
        $("#logout-btn").hide();
    });
});
```

* Initializes login flow when page loads
* Login button redirects to Cognito
* Logout button clears cookies and UI

---

## ✅ Usage Instructions

1. **Configure Cognito**:

   * Hosted UI enabled
   * Add your redirect URI (e.g., `https://demo.xinitry.com`)
   * Set appropriate OAuth scopes: `openid`, `email`, `profile`, etc.

2. **Update the Login URL**:

   * Replace `client_id`, `redirect_uri`, and domain with your own Cognito info in `script.js`

3. **Host the files**:

   * Upload to S3 static hosting or your web server
   * Ensure it runs over HTTPS (Cognito requires it)

4. **Visit your page**:

   * Click **Login**
   * Authenticate with Cognito
   * Return to the app and view token/user info

5. **Logout**:

   * Click **Logout** to clear tokens and session

---

## ⚙️ Dependencies

* [jQuery 3.7.1](https://code.jquery.com/)
* [AWS SDK for JavaScript v2](https://sdk.amazonaws.com/js/aws-sdk-2.1692.0.min.js)

---

## 🚫 Known Limitations

* Does not validate token expiration
* Refresh token is stored but not used
* Tokens are displayed openly (for debugging only — **don’t do this in production**)
* No CSRF or XSS protection added — this is a **demo**

---

## 🧪 Tips for Production

* Use secure cookie flags and proper token storage
* Rotate client secrets if compromised
* Handle token refresh using Cognito’s `/oauth2/token` endpoint
* Use a backend or proxy for secure operations

---

## ⚠️ SECURITY DISCLAIMER

This code is provided as-is for educational and development purposes. While efforts have been made to ensure correctness, it is **your responsibility** to:

- Review and validate the code before use  
- Ensure it meets your security requirements  
- Test thoroughly in a non-production environment  
- Never commit credentials to version control  
- Follow your organization's security policies  

> **DO NOT** use this code in production without proper security review and testing.

---
