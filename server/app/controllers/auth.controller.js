var passport = require('passport');

exports.googleAuth = function(req, res) {
  console.log('google auth');
  return passport.authenticate('google', { scope : ['profile', 'email'] })
}

exports.googleCallback = function(req, res) {
  console.log('google callback');
  return passport.authenticate('google', {
    successRedirect: '/search',
    failureRedirect: '/'
  });
}
