// construct the URL for the file
const fileUrl = "bonita/portal" + context_myDocument_ref.url;

// create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// set the responseType to 'blob' so that the response is returned as a binary blob
xhr.responseType = 'blob';

// open the connection to the server with the GET method and the fileUrl
xhr.open('GET', fileUrl);

// set the onload callback function to handle the response
xhr.onload = function() {
  // create a new anchor element to create a download link
  const a = document.createElement('a');
  
  // create a Blob object from the response data
  const blob = new Blob([xhr.response], { type: 'application/octet-stream' });
  
  // set the href attribute of the anchor element to the URL of the Blob object
  a.href = URL.createObjectURL(blob);
  
  // set the download attribute of the anchor element to the file name
  a.download = context_myDocument_ref.name;
  
  // append the anchor element to the document
  document.body.appendChild(a);
  
  // trigger a click event on the anchor element to start the download
  a.click();
  
  // remove the anchor element from the document
  document.body.removeChild(a);
};

// send the request
xhr.send();
