var auth = require('../controllers/auth.controller.js');
var bars = require('../controllers/bars.controller.js');

module.exports = function(app) {

  // auth

  app.get('/auth/google', auth.googleAuth);

  app.get('/auth/google/callback', auth.googleCallback);

  app.get('/logout', auth.logout);

  app.get('/user', auth.getUser);

  // bars

  app.get('/search', bars.search);

  app.get('/go/:barId', auth.checkAuth, bars.go);

};
