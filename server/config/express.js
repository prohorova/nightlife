var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var compress = require('compression');
var passport = require('passport');

var config = require('./config.js');

module.exports = function() {
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  } else {
    app.use(morgan('dev'));
  }

  app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static('./dist'));

  require('../app/routes/router.js')(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

  return app;
};




