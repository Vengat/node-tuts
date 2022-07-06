/*
* Primary file for the api
*/

//console.log("Hello node world");

// Dependencies
const http = require('http');
const url = require('url');

// The server should respond for all requests with a string

const server = http.createServer(function(req, res){
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path from the url
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'')

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Send the response
    res.end('Hello node world\n');

    // Log the request path
    console.log(`Request received on path: ${trimmedPath} with method: ${method} and with query string parameters: `, queryStringObject);
    console.log('Request received with these headers ',  headers);
    
});

// Start the server and listen on port 3000
// server.listen(3000, function() {
//     console.log("The server is listening on port 3000 now");
// });