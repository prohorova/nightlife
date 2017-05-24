var path = require('path');

var auth = require('../controllers/auth.controller.js');
var bars = require('../controllers/bars.controller.js');

module.exports = function(app) {

  app.get('/auth/google', auth.googleAuth);

  app.get('/auth/google/callback', auth.googleCallback);

  app.get('/search', bars.search);

  app.post('/go', bars.go);

  app.get('/comers/:barId', bars.comers)

}
