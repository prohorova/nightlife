var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  googleId: String,
  name: String,
  providerData: {}
});

UserSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret.googleId;
    delete ret.providerData;
  }
}

mongoose.model('User', UserSchema);
