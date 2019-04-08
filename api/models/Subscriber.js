const mongoose = require('mongoose');

// Define collection and schema for List
var schema = new mongoose.Schema({
  endpoint: 'string',
  keys: {
    auth: 'string',
    p256dh: 'string'
  }
},{
  collection: "subscriber"
});


module.exports = mongoose.model('Subscriber', schema);
