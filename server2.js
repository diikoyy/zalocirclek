const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

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
  const key = keys.installed || keys.web;
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

// @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
// range: 'Class Data!A2:E',

/*
async function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
    range: 'Sheet1!B2:D',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
  console.log('Phone Number', 'Result:');
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}`, `${row[2]}`);
  });
} */

/*
async function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
      range: 'Sheet1!B2:D',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }
  
    const messages = [];
  
    rows.forEach((row) => {
      const message = {
        type: "text",
        Phone_Number: `${row[0]}, Result: ${row[2]}`
      };
      messages.push(message);
    });
  
    const content = {
      messages,
      actions: [{
        type: "query",
        payload: "query_data_example"
      }]
    };
  
    const chatbot = {
      version: "chatbot",
      content
    };
  
    console.log(JSON.stringify(chatbot));
  }  

authorize().then(listMajors).catch(console.error); */

/*
app.get('/', async (req, res) => {
    try {
      const auth = await authorize();
      const sheets = google.sheets({ version: 'v4', auth });
      const result = await sheets.spreadsheets.values.get({
        spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
        range: 'Sheet1!B2:D',
      });
      const rows = result.data.values;
      if (!rows || rows.length === 0) {
        res.status(404).send('No data found.');
        return;
      }
  
      const messages = [];
  
      rows.forEach((row) => {
        const message = {
          type: 'text',
          Phone_Number: `${row[0]}, Result: ${row[2]}`,
        };
        messages.push(message);
      });
  
      const content = {
        messages,
        actions: [
          {
            type: 'query',
            payload: 'query_data_example',
          },
        ],
      };
  
      const chatbot = {
        version: 'chatbot',
        content,
      };
  
      res.status(200).json(chatbot);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }); */

  /**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA/edit#gid=0
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
  app.get('/result/:phoneNumber', async (req, res) => {
    try {
    const phoneNumber = req.params.phoneNumber;
    const auth = await authorize();
    const sheets = google.sheets({version: 'v4', auth});
    const sheet_data = await sheets.spreadsheets.values.get({
      spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
      range: 'Sheet1!A2:D',
    });
    const rows = sheet_data.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
    //   res.status(404).send('No data found.');
      res.json("No data found.");
      return;
    }
  
    const result = rows.find(row => row[1] === phoneNumber);
    if (!result) {
      console.log('No result found for phone number:', phoneNumber);
    //   res.status(404).send('No result found.');
      res.json(`No result found for phone number: ${phoneNumber}`);
      return;
    }
  
    // const message = `Result for ${phoneNumber}: ${result[3]}`;
    // console.log(message);
    // res.send(message);

    //phoneNumber = req.params.phoneNumber
    const messages = [{
        type: "text",
        Phone_Number: `${phoneNumber}, Result: ${result[3]}`
      }];
    
      const content = {
        messages,
        actions: [{
          type: "query",
          payload: "query_data_example"
        }]
      };
    
      const chatbot = {
        version: "chatbot",
        content,
      };
    
      res.json(chatbot);
    } catch (error) {
      console.error(error);
    //   res.status(500).send('Internal Server Error');
      res.json("Internal Server Error");
    }
  });
  
  
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// const data = [  ["Phone Number", "Result"],
//   ["0918123123", "Phù hợp"],
//   ["0918123124", "Chưa phù hợp"],
//   ["0918123125", "Chờ cửa hàng"],
//   ["0918123126", "Phù hợp"],
//   ["0123456789", "Phù hợp"]
// ];

// const messages = [];

// data.slice(1).forEach(row => {
//   const message = {
//     type: "text",
//     Phone_Number: `${row[0]}, Result: ${row[1]}`
//   };
//   messages.push(message);
// });

// const zaloJson = {
//   version: "chatbot",
//   content: {
//     messages: messages,
//     actions: [
//       {
//         type: "query",
//         payload: "query_data_example"
//       }
//     ]
//   }
// };

// console.log(JSON.stringify(zaloJson));
