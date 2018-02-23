const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 80;

function handleRequest(req, res) {
  
}

// Create the webserver
var server = http.createServer(handleRequest);

// Start listening for HTTP requests
server.listen(PORT, function() {
  console.log("Listening at port ", PORT);
});
