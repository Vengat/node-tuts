/*
* Primary file for the api
*/

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder; 

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

    // Get the payload if any requires stringdecoder
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data)
    });

    req.on('end', function() {
        buffer += decoder.end();

        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        console.log(`chosen handler ... ${chosenHandler}`);

        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        // Route the request to the handler specified in the request
        chosenHandler(data, function(statusCode, payload) {
            // Use the status code called back by the handler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            let payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            //res.end('Hello node world\n');
    
            //console.log('Request received with this payload: ', buffer);
            console.log('Returning this response ', statusCode, payloadString);   
        });

    });
});

// Start the server and listen on port 3000
server.listen(3000, function() {
    console.log("The server is listening on port 3000 now");
});

// Define handlers
let handlers = {};

// Sample handler
handlers.sample = function(data, callback) {
    // callback a http status code and a payload object
    callback(406, {'name' : 'sample handler'});
};

// Not found handler
handlers.notFound = function(data, callback) {
    callback(404);
};

// Define a router
const router = {
    'sample' : handlers.sample
};
