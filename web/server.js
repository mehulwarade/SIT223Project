var cors = require('cors');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
var certificate = fs.readFileSync('certificates/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// For https
httpsServer.listen(8443);
app.listen(port, () => {
  console.log(`https app:listening on port ${port}`);
  });

const base = `${__dirname}/public`;
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(`${base}/homepage.html`);
  });

app.get('*', function(req, res) {
    res.sendFile(`${base}/404.html`);
  });


