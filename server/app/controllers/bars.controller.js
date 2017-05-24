var yelpApi = require('../api/yelpApi.js');

exports.search = function(req, res) {
  var location = req.query.location;
  yelpApi.getBars(location).then(function(result) {
    var bars = result.businesses;
    res.send(bars);
  }, function(err) {
    res.status(500).send(err);
  })
}

exports.go = function(req, res) {

}

exports.comers = function(req, res) {

}
