
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./server/config/mongoose.js');
var express = require('./server/config/express.js');
var passport = require('./server/config/passport.js');

var port = process.env.PORT || 3000;

var db = mongoose();
var app = express();
var passport = passport();

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
