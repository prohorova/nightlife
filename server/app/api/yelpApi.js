var Yelp = require('node-yelp-api-v3');
var config = require('../../config/config.js');

var yelp = new Yelp({
  consumer_key: config.yelp.clientID,
  consumer_secret: config.yelp.clientSecret
});

exports.getBars = function(location, limit) {
  return yelp.searchBusiness({
    term: 'bars',
    location: location,
    limit: 20
  });
}
