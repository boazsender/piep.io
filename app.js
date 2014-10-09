const debug = (process.env.NODE_ENV === 'development');
const host = 'localhost';
const port = 8000;

const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));
app.use(cookieParser('^#^^D&SHxbGAk1'));
app.use(session({
  secret: '12**-_913^$^3##',
  cookie: {
    secret: true
  },
  saveUninitialized: true,
  resave: true
}));

// serve public dir
app.use(express.static('public'));

if (debug) {
  // allow requirejs to find deps async in development
  app.use('/app', express.static('app'));
  app.use('/config', express.static('config'));
  app.use('/bower_components', express.static('bower_components'));
  app.use('/public', express.static('public'));
  app.use('/test', express.static('test'));
}

// serve index from any route
app.use(function(req, res) {
  res.sendFile(path.resolve('public/index.html'));
});

http.createServer(app).listen(port, host);
console.log('Server running on %s:%d', host, port);
