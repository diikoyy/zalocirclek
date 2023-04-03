const { google } = require('googleapis');
const { auth } = require('google-auth-library');

// Load the client secret JSON file
const clientSecret = require('/path/to/client_secret.json');

// Create a new OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  clientSecret.web.client_id,
  clientSecret.web.client_secret,
  clientSecret.web.redirect_uris[0]
);

// Generate an authorization URL
const authorizeUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Log in to the Google account using a browser
console.log('Please visit this URL to authorize the application:', authorizeUrl);
const code = // Get the authorization code from the browser

// Exchange the authorization code for an access token and refresh token
const getToken = async () => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}
const tokens = await getToken();

// Set the access token and refresh token on the OAuth2 client
oauth2Client.setCredentials(tokens);
