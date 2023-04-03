const puppeteer = require('puppeteer');

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

    // await browser.close();
}) ();