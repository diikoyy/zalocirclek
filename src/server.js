// var express = require("express"); 
// var app = express();
// const request = require('request');

// const options = {  
//     url: 'https://script.googleusercontent.com/macros/echo?user_content_key=dW_CxrAV4diYHCRmM0_MJO3H4wp5crX6YyzP4XjzgykNhFSKux5U6VIdWOoodtPtlKctAMzpU6LqgvR1qBhUprdF40-LSp5nm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBxBN8gpWeGm_EImHQK8gCI9D-PXKAsLLDXRYjoxcOavD5rdS7vLqhCAE5q174xAaBelzWMTRi2KrlCpLMr8CD5RabxSyJ-_nA&lib=MmKaaG3THdw4j4PjomEFxn678DaB6xH8n',
//     // url: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-01',
//     // url: '"/bonita/portal/" + context.myDocument_ref.url',
//     // url: '"/bonita/portal/" + context.myDocument_ref.url',
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//         'Accept-Charset': 'utf-8',
//         'User-Agent': 'my-reddit-client'
//     }
// };

// app.get("/", function(req, res)  {
//         request(options, function(err, output, body) {  
//         var json = JSON.parse(body);
//         console.log(json); // Logging the output within the request function
//         res.json(json) //then returning the response.. The request.json is empty over here
// }); //closing the request function

// });

// app.listen(3000, function() {  
//     console.log("My API is running on Port 3000 ... ");
// });

// module.exports = app;

// //2nd
// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// app.get('/', async (req, res) => {
//   try {
//     // 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-01'
//     const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=s48ix0FuzP_VfR2EtnrNieYsOllu7sUK4VvZXxhXEg-1LXRXFq4f9mUHtH7553P2ZhRfbVeXGH5C8OhCXnn7kesVCHsaDke6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAjjimSiZ9x1Fhn0pIwFEvx4GOJcLCWA1lLc5pGRivCL3gbq2xhJfR0w-1yvhzPNew&lib=MmKaaG3THdw4j4PjomEFxn678DaB6xH8n');

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while fetching data');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

