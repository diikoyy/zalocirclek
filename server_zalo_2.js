const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const port = 3000;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'circlekToken.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'circlekCredentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  // const key = keys.installed || keys.web;
  const key = keys.installed;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

const server = http.createServer((req, res) => {
  // Set response headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'gzip');

  // Handle requests for the '/result-button' endpoint
  if (req.method === 'GET' && req.url.startsWith('/result-button')) {
    const { phoneNumber } = url.parse(req.url, true).query;

    authorize()
      .then((auth) => {
        const sheets = google.sheets({ version: 'v4', auth });
        return sheets.spreadsheets.values.get({
          spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
          range: 'Sheet1!A2:D',
        });
      })
      .then((sheet_data) => {
        const rows = sheet_data.data.values;

        if (!rows || rows.length === 0) {
          const noDataMessage = 'No Data Found';
          const responseNoDataMessageBody = JSON.stringify(noDataMessage);
          const contentLengthNoDataMessage = Buffer.byteLength(responseNoDataMessageBody);
          
          res.statusCode = 404;
          res.setHeader('Content-Length', contentLengthNoDataMessage)
          res.end(responseNoDataMessageBody);
          return;
        }

        const result = rows.find((row) => row[1] === phoneNumber);
        if (!result) {
          console.log('No result found for phone number:', phoneNumber);
          const errorMessage = `No result found for phone number: ${phoneNumber}`;
          const responseErrorMessageBody = JSON.stringify(errorMessage);
          const contentLengthErrorMessage = Buffer.byteLength(responseErrorMessageBody);

          res.statusCode = 404;
          res.setHeader('Content-Length', contentLengthErrorMessage);
          res.end(responseErrorMessageBody);
          return;
        }

        const messages = [
          {
            type: 'text',
            text: `${result[3]}`,
            button: []
          },
        ];

        const content = {
          messages,
        };

        const chatbot = {
          version: 'chatbot',
          content,
        };

        const responseChatbotBody = JSON.stringify(chatbot);
        const contentLengthChatbot = Buffer.byteLength(responseChatbotBody, 'utf8');

        res.statusCode = 200;
        res.setHeader('Content-Length', contentLengthChatbot);
        res.setHeader('Transfer-Encoding', 'gzip');
        res.end(responseChatbotBody);
      })
      .catch((err) => {
        console.error('Error fetching data from Google Sheets API:', err);
        res.statusCode = 500;
        res.end(JSON.stringify('Internal Server Error'));
      });
  } 
  else if (req.method === 'GET' && req.url.startsWith('/result')) {
    const { phoneNumber } = url.parse(req.url, true).query;

    authorize()
      .then((auth) => {
        const sheets = google.sheets({ version: 'v4', auth });
        return sheets.spreadsheets.values.get({
          spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
          range: 'Sheet1!A2:D',
        });
      })
      .then((sheet_data) => {
        const rows = sheet_data.data.values;

        if (!rows || rows.length === 0) {
          const noDataMessage = 'No Data Found';
          const responseNoDataMessageBody = JSON.stringify(noDataMessage);
          const contentLengthNoDataMessage = Buffer.byteLength(responseNoDataMessageBody);
          
          res.statusCode = 404;
          res.setHeader('Content-Length', contentLengthNoDataMessage)
          res.end(responseNoDataMessageBody);
          return;
        }

        const result = rows.find((row) => row[1] === phoneNumber);
        if (!result) {
          console.log('No result found for phone number:', phoneNumber);
          const errorMessage = `No result found for phone number: ${phoneNumber}`;
          const responseErrorMessageBody = JSON.stringify(errorMessage);
          const contentLengthErrorMessage = Buffer.byteLength(responseErrorMessageBody);

          res.statusCode = 404;
          res.setHeader('Content-Length', contentLengthErrorMessage);
          res.end(responseErrorMessageBody);
          return;
        }

        const messages = [
          {
            type: 'text',
            text: `${result[3]}`,
          },
        ];

        const content = {
          messages,
        };

        const chatbot = {
          version: 'chatbot',
          content,
        };

        const responseChatbotBody = JSON.stringify(chatbot);
        const contentLengthChatbot = Buffer.byteLength(responseChatbotBody, 'utf8');

        res.statusCode = 200;
        res.setHeader('Content-Length', contentLengthChatbot);
        res.setHeader('Transfer-Encoding', 'gzip');
        res.end(responseChatbotBody);
      })
      .catch((err) => {
        console.error('Error fetching data from Google Sheets API:', err);
        res.statusCode = 500;
        res.end(JSON.stringify('Internal Server Error'));
      });
  } 
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});