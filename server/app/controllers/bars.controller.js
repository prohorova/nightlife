var yelpApi = require('../api/yelpApi.js');
var async = require('async');

var Bar = require('mongoose').model('Bar');

exports.search = function(req, res) {
  async.waterfall([async.apply(findBars, req.query), getComers], function(err, result) {
    if (err) {
      return res.send([]);
    }
    res.send(result);
  });
};

function findBars(query, callback) {
  var location = query.location;
  yelpApi.getBars(location).then(function(result) {
    var bars = result.businesses;
    callback(null, bars);
  }, function(err) {
    callback(err);
  })
}

function getComers(bars, callback1) {
  var newBars = [];
  async.each(bars, function(bar, callback2) {
    Bar.findOne({yelpId: bar.id}).exec(function(err, found) {
      if (err) return callback2(err);
      if (found) {
        bar.comers = found.comers;
      }
      newBars.push(bar);
      callback2(null);
    })
  }, function(err) {
    if (err) return callback1(err);
    return callback1(null, newBars);
  });
}

exports.go = function(req, res) {
  var barId = req.params.barId;
  if (!barId) return res.status(400).send({message: 'No bar'});
  Bar.findOne({yelpId: barId}, function(err, bar) {
    if (err) return res.status(500).send(err);
    if (bar) {
      var userIndex = bar.comers.indexOf(req.user.id);
      if (userIndex > -1) {
        bar.comers.splice(userIndex, 1);
      } else {
        bar.comers.push(req.user._id);
      }
    } else {
      bar = new Bar({yelpId: barId, comers: [req.user._id]});
    }
    bar.save(function(err) {
      if (err) return res.status(500).send(err);
      return res.send(bar.comers);
    })
  })
};

