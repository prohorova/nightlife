var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BarSchema = new Schema({
  yelpId: String,
  comers: [{type: Schema.ObjectId, ref: 'User'}]
});

mongoose.model('Bar', BarSchema);
