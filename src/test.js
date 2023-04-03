// Download File using 3rd party library

// Importing the download module
const download = require('download');

// Path of the image to be downloaded
const file = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
// Path to store the downloaded file
const filePath = `${__dirname}/files`;

download(file,filePath)
.then(() => {
   console.log('File downloaded successfully!');
})