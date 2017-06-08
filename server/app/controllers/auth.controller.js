var passport = require('passport');

exports.googleAuth = function(req, res) {
  req.session.redirectTo = req.query.path;
  return passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']})(req, res);
};

exports.googleCallback = function(req, res) {
  var redirectTo = req.session.redirectTo || '/';
  return passport.authenticate('google', {successRedirect: redirectTo, failureRedirect: redirectTo})(req, res);
};

exports.logout = function(req, res) {
  req.logout();
  res.send({success: true});
};

exports.checkAuth = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send('Not authenticated');
  next();
};

exports.getUser = function(req, res) {
  var user = false;
  if (req.user) {
    user = req.user.toJSON();
  }
  res.send(user);
};
