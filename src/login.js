/* // http://localhost:8080/bonita/loginservice?redirect=true&redirectUrl=apps%2FappDirectoryBonita

const superagent = require('superagent').agent()

const login = async () => {
    let loginSuccess = await superagent
    .post('http://localhost:8080/bonita/loginservice?redirect=true&redirectUrl=apps%2FappDirectoryBonita')
    // .post('http://localhost:8080/bonita/login.jsp?_l=en&redirectUrl=apps%2FappDirectoryBonita')
    .send({username: 'walter.bates', password: "bpm"})
    .set('Content-Type', 'application/x-www-form-urlencoded');
    // console.log(loginSuccess.text);

    let referral = await superagent.get('http://localhost:8080/bonita/apps/appDirectoryBonita/home/?_l=en');
    console.log(referral.text)
};

login(); */

var express = require("express"); 
var app = express();
const request = require('request');
const puppeteer = require('puppeteer');

// Download File using 3rd party library
// Importing the download module
const download = require('download');

 const options = {  
    // url: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-01',
    url: '"/bonita/portal/" + context.myDocument_ref.url',
    // url: '"/bonita/portal/" + context.myDocument_ref.url',
    method: 'POST',
    headers: {
        'Access-Control-Allow-Origin': 'true',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
};

app.get("/", function(req, res)  {
    request(options, function(err, output, body) {  
    (async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/bonita/login.jsp?_l=en&redirectUrl=apps%2FappDirectoryBonita');

    await page.waitForSelector('#username');
    await page.type('#username', 'walter.bates');

    await page.waitForSelector('#password');
    await page.type('#password', 'bpm');


    await page.waitForSelector(".formactions");
    await page.click(".formactions input");

    // await page.waitForSelector(".component.col-xs-12.col-sm-12.col-md-12.col-lg-12.ng-scope");
    // await page.click(".component.col-xs-12.col-sm-12.col-md-12.col-lg-12.ng-scope pb-image");

    // await page.waitForSelector(".Cell--with-actions.TaskTable-actions.ng-scope");
    // await page.click(".Cell--with-actions.TaskTable-actions.ng-scope a");

    // await page.waitForSelector(".text-left");
    // await page.click(".text-left a");

    await browser.close();
}) ()});
// });
    try {
    /* request(options, function(err, output, body) {  
    var json = JSON.parse(body);
    console.log(json); // Logging the output within the request function
    res.json(json) //then returning the response.. The request.json is empty over here */

    // Path of the image to be downloaded
    // http://localhost:8080/bonita/portal/documentDownload?fileName=Final-Exam-2021+%281%29.pdf&contentStorageId=205
    // const file = 'http://localhost:8080/bonita/portal/documentDownload?fileName=Final-Exam-2021+%281%29.pdf&contentStorageId=204';
    // const file = 'http://localhost:8080/bonita/portal/documentDownload?fileName=Final-Exam-2021+%281%29.pdf&contentStorageId=402';
    const file ='"/bonita/portal/" + context.myDocument_ref.url';
    
    // Path to store the downloaded file
    const filePath = `${__dirname}/files`;

    download(file,filePath)
    .then(() => {
    console.log('File downloaded successfully!');
    })}
    catch (error) {
        res.status(error.response.status)
        return res.send(error.message);
    }}); //closing the request function

app.listen(3000, function() {  
console.log("My API is running on Port 3000 ... ");
});

module.exports = app;