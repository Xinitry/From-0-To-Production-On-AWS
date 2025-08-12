const COGNITO_LOGIN_URL = ""; // Your Cognito Login URL Goes Here
function parseTokenFromURL() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return {
        access_token: params.get("access_token"),
        id_token: params.get("id_token"),
        refresh_token: params.get("refresh_token")
    };
}

function setCookie(name, value, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/; secure; samesite=strict`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
}

function clearAllCookies() {
    deleteCookie("access_token");
    deleteCookie("id_token");
    deleteCookie("refresh_token");
}

function showMessage(message) {
    $("#message").text(message);
}

function displayUserData(dataDict) {
    $("#userdata").text(JSON.stringify(dataDict, null, 2));
    $("#id_token").text(`Here is the ID_Token: ${getCookie("id_token")}`);
    $("#access_token").text(`Here is the Access_Token: ${getCookie("access_token")}`);
}

function fetchCognitoUser(accessToken) {
    AWS.config.region = 'us-east-1'; // Update if needed

    const cognito = new AWS.CognitoIdentityServiceProvider();
    const params = { AccessToken: accessToken };

    cognito.getUser(params, function(err, data) {
        if (err) {
            console.error("Error getting user data", err);
            showMessage("❌ Failed to retrieve user data.");
        } else {
            showMessage("✅ Logged in successfully!");

            // Build user dictionary
            var data_dict = {};
            for (var i = 0; i < data.UserAttributes.length; i++) {
                data_dict[data.UserAttributes[i].Name] = data.UserAttributes[i].Value;
            }

            displayUserData(data_dict);
        }
    });
}

function handleLoginFlow() {
    const { access_token, id_token, refresh_token } = parseTokenFromURL();

    if (access_token && id_token) {
        // Store tokens in cookies
        setCookie("access_token", access_token, 1);
        setCookie("id_token", id_token, 1);
        if (refresh_token) {
            setCookie("refresh_token", refresh_token, 1);
        }

        // Use access token to get user info
        fetchCognitoUser(access_token);

        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);

        $("#login-btn").hide();
        $("#logout-btn").show();
    } else {
        // If already logged in (cookies exist)
        const storedToken = getCookie("access_token");
        if (storedToken) {
            fetchCognitoUser(storedToken);
            $("#login-btn").hide();
            $("#logout-btn").show();
        }
    }
}

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