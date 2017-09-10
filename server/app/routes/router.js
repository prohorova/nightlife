var auth = require('../controllers/auth.controller.js');
var bars = require('../controllers/bars.controller.js');

module.exports = function(app) {

  // auth

  app.get('/api/auth/google', auth.googleAuth);

  app.get('/api/auth/google/callback', auth.googleCallback);

  app.get('/api/logout', auth.logout);

  app.get('/api/user', auth.getUser);

  // bars

  app.get('/api/search', bars.search);

  app.get('/api/go/:barId', auth.checkAuth, bars.go);

};
