var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: String,
  name: String,
  providerData: {}
});

mongoose.model('User', UserSchema);
