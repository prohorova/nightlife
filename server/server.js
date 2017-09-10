
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose.js');
var express = require('./config/express.js');
var passport = require('./config/passport.js');

var port = process.env.PORT || 3000;

var db = mongoose();
var app = express();
var passport = passport();

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
