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

  /** Get google sheet
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA/edit#gid=0
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

  // app.get('/result-button/:phoneNumber', async (req, res) => {
  //   try {
  //   const phoneNumber = req.params.phoneNumber;
  //   const auth = await authorize();
  //   const sheets = google.sheets({version: 'v4', auth});
  //   const sheet_data = await sheets.spreadsheets.values.get({
  //     spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
  //     range: 'Sheet1!A2:D',
  //   });

  //   const rows = sheet_data.data.values;
  //   if (!rows || rows.length === 0) {
  //     const noDataMessage = "No data found";
  //     const responseBody = JSON.stringify(noDataMessage);
  //     const contentLength = Buffer.byteLength(responseBody);
  //     // console.log(noDataMessage);
  //     //   res.status(404).send('No data found.');

  //     res.set('Cache-Control', 'no-store, must-revalidate');
  //     res.set('Expires', '0');
  //     res.set('Pragma', 'no-cache');
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     res.setHeader('Content-Length', Buffer.byteLength(contentLength));
  //     res.set('Transfer-Encoding', 'gzip');
  //     res.status(404).send(responseBody);
  //     return;
  //   }
  
  //   const result = rows.find(row => row[1] === phoneNumber);
  //   if (!result) {
  //     console.log('No result found for phone number:', phoneNumber);
  //     const errorMessage = `No result found for phone number: ${phoneNumber}`;
  //     const responseBody = JSON.stringify(errorMessage);
  //     const contentLength = Buffer.byteLength(responseBody);
  //   //   res.status(404).send('No result found.');
  //     res.set('Cache-Control', 'no-store, must-revalidate');
  //     res.set('Expires', '0');
  //     res.set('Pragma', 'no-cache');
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     res.setHeader('Content-Length', contentLength);
  //     res.set('Transfer-Encoding', 'gzip');
  //     res.status(404).send(responseBody);
  //     return;
  //   }

  //   // Phone_Number: `${phoneNumber}`,
  //   const messages = [{
  //       type: "text",
  //       text: `${result[3]}`,
  //       // text: "Phù hợp",
  //       button: []
  //     }];
    
  //     // actions: [{
  //     //   type: "query",
  //     //   payload: "query_data_example"
  //     // }]
  //     const content = {
  //       messages,
  //     };
    
  //     const chatbot = {
  //       version: "chatbot",
  //       content,
  //     };
    
  //     const responseBody = JSON.stringify(chatbot);
  //     const contentLength = Buffer.byteLength(responseBody);

  //     res.set('Cache-Control', 'no-store, must-revalidate');
  //     res.set('Expires', '0');
  //     res.set('Pragma', 'no-cache');
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     res.setHeader('Content-Length', contentLength);
  //     res.set('Transfer-Encoding', 'gzip');
  //     res.status(200).send(responseBody);
  //   } catch (error) {
  //     console.error(error);
  //   //   res.status(500).send('Internal Server Error');
  //     const errorMessage = "Internal Server Error";
  //     const responseBody = JSON.stringify(errorMessage);
  //     const contentLength = Buffer.byteLength(responseBody);

  //     res.set('Cache-Control', 'no-store, must-revalidate');
  //     res.set('Expires', '0');
  //     res.set('Pragma', 'no-cache');
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     res.setHeader('Content-Length', contentLength);
  //     res.set('Transfer-Encoding', 'gzip');
  //     res.status(500).send(responseBody);
  //   }
  // });

  // app.get('/result/:phoneNumber', async (req, res) => {
  //   try {
  //   const phoneNumber = req.params.phoneNumber;
  //   const auth = await authorize();
  //   const sheets = google.sheets({version: 'v4', auth});
  //   const sheet_data = await sheets.spreadsheets.values.get({
  //     spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
  //     range: 'Sheet1!A2:D',
  //   });
  //   const rows = sheet_data.data.values;
  //   if (!rows || rows.length === 0) {
  //     const noDataMessage = "No data found";
  //     const responseBody = JSON.stringify(noDataMessage);
  //     const contentLength = Buffer.byteLength(responseBody);
  //     // console.log(noDataMessage);
  //     //   res.status(404).send('No data found.');

  //     res.set('Cache-Control', 'no-store, must-revalidate');
  //     res.set('Expires', '0');
  //     res.set('Pragma', 'no-cache');
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     res.setHeader('Content-Length', Buffer.byteLength(contentLength));
  //     res.set('Transfer-Encoding', 'gzip');
  //     res.status(404).send(responseBody);
  //     return;
  //   }
  
  //   const result = rows.find(row => row[1] === phoneNumber);

  //   if (!result) {
  //     console.log('No result found for phone number:', phoneNumber);
  //     const errorMessage = `No result found for phone number: ${phoneNumber}`;
  //     const responseBody = JSON.stringify(errorMessage);
  //     const contentLength = Buffer.byteLength(responseBody);
  //   //   res.status(404).send('No result found.');
  //     res.set('Cache-Control', 'no-store, must-revalidate');
  //     res.set('Expires', '0');
  //     res.set('Pragma', 'no-cache');
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     res.setHeader('Content-Length', contentLength);
  //     res.set('Transfer-Encoding', 'gzip');
  //     res.status(404).send(responseBody);
  //     return;
  //   }

  //   // Phone_Number: `${phoneNumber}`,
  //   const messages = [{
  //       type: "text",
  //       text: `${result[3]}`,
  //     }];
    
  //     // actions: [{
  //     //   type: "query",
  //     //   payload: "query_data_example"
  //     // }]
  //     const content = {
  //       messages,
  //     };
    
  //     const chatbot = {
  //       version: "chatbot",
  //       content,
  //     };
    
  //     const responseBody = JSON.stringify(chatbot);
  //     const contentLength = Buffer.byteLength(responseBody);

  //     res.set('Cache-Control', 'no-store, must-revalidate');
  //     res.set('Expires', '0');
  //     res.set('Pragma', 'no-cache');
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     res.setHeader('Content-Length', contentLength);
  //     res.set('Transfer-Encoding', 'gzip');
  //     res.status(200).send(responseBody);
  //   } catch (error) {
  //     console.error(error);
  //   //   res.status(500).send('Internal Server Error');
  //     const errorMessage = "Internal Server Error";
  //     const responseBody = JSON.stringify(errorMessage);
  //     const contentLength = Buffer.byteLength(responseBody);

  //     res.set('Cache-Control', 'no-store, must-revalidate');
  //     res.set('Expires', '0');
  //     res.set('Pragma', 'no-cache');
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     res.setHeader('Content-Length', contentLength);
  //     res.set('Transfer-Encoding', 'gzip');
  //     res.status(500).send(responseBody);
  //   }
  // });
  
    // app.listen(port, () => {
    //     console.log(`Server listening at http://localhost:${port}`);
    // });

    app.use((req, res, next) => {
      res.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8');
      res.set('Accept-Encoding', 'gzip, deflate');
      res.set('Accept-Language', 'en-US,en');
      res.set('Connection', 'keep-alive');
      res.set('Content-Type', 'application/json; charset=utf-8');
      // res.set('Sec-GPC', '1');
      // res.set('Upgrade-Insecure-Requests', '1');
      // res.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');
      res.set('Cache-Control', 'no-store, must-revalidate');
      // res.set('Expires', '0');
      res.set('Pragma', 'no-cache');
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Transfer-Encoding', 'gzip');
      next();
    });
    

  // app.get('/result-button/:phoneNumber', async (req, res) => {
  app.get('/result-button', async (req, res) => {
  try {
    // const phoneNumber = req.params.phoneNumber;
    const phoneNumber = req.query.phoneNumber;
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    const sheet_data = await sheets.spreadsheets.values.get({
      spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
      range: 'Sheet1!A2:D',
    });
    const rows = sheet_data.data.values;
    if (!rows || rows.length === 0) {
      const noDataMessage = 'No data found';
      const responseBody = JSON.stringify(noDataMessage);
      const contentLength = Buffer.byteLength(responseBody);

      // res.set('Host', `103.20.144.75:3000/result/${phoneNumber}`);
      // res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Length', contentLength);
      res.status(404).end(responseBody);
      return;
    }

    const result = rows.find((row) => row[1] === phoneNumber);
    if (!result) {
      console.log('No result found for phone number:', phoneNumber);
      const errorMessage = `No result found for phone number: ${phoneNumber}`;
      const responseBody = JSON.stringify(errorMessage);
      const contentLength = Buffer.byteLength(responseBody);

      // res.set('Host', `103.20.144.75:3000/result/${phoneNumber}`);
      // res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Length', contentLength);
      res.status(404).end(responseBody);
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

    const responseBody = JSON.stringify(chatbot);
    const normalizedContentLengthText = responseBody.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const contentLength = Buffer.byteLength(normalizedContentLengthText);

    // res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Length', contentLength);
    res.status(200).end(normalizedContentLengthText);
  } catch (error) {
    console.error(error);
    const errorMessage = 'Internal Server Error';
    const responseBody = JSON.stringify(errorMessage);
    const contentLength = Buffer.byteLength(responseBody, 'utf-8');
    

    // res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Length', contentLength);
    res.status(500).end(responseBody);
  }
});

  // app.get('/result/:phoneNumber', async (req, res) => {
  app.get('/result', async (req, res) => {
  try {
    // const phoneNumber = req.params.phoneNumber;
    const phoneNumber = req.query.phoneNumber;
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    const sheet_data = await sheets.spreadsheets.values.get({
      spreadsheetId: '19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA',
      range: 'Sheet1!A2:D',
    });
    const rows = sheet_data.data.values;
    if (!rows || rows.length === 0) {
      const noDataMessage = 'No data found';
      const responseBody = JSON.stringify(noDataMessage);
      const contentLength = Buffer.byteLength(responseBody, 'utf-8');

      res.set('Host', `103.20.144.75:3000/result/${phoneNumber}`);
      
      res.setHeader('Content-Length', contentLength);
      res.status(404).end(responseBody);
      return;
    }

    const result = rows.find((row) => row[1] === phoneNumber);
    if (!result) {
      console.log('No result found for phone number:', phoneNumber);
      const errorMessage = `No result found for phone number: ${phoneNumber}`;
      const responseBody = JSON.stringify(errorMessage);
      const contentLength = Buffer.byteLength(responseBody);

      // res.set('Host', `103.20.144.75:3000/result/${phoneNumber}`);
      // res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Length', contentLength);
      res.status(404).end(responseBody);
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

    const responseBody = JSON.stringify(chatbot);
    const normalizedContentLengthText = responseBody.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const contentLength = Buffer.byteLength(normalizedContentLengthText);

    // res.set('Host', `103.20.144.75:3000/result/${phoneNumber}`);
    // res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Length', contentLength);
    res.status(200).end(normalizedContentLengthText);
  } catch (error) {
    console.error(error);
    const errorMessage = 'Internal Server Error';
    const responseBody = JSON.stringify(errorMessage);
    const contentLength = Buffer.byteLength(responseBody);
    

    // res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Length', contentLength);
    res.status(500).end(responseBody);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
