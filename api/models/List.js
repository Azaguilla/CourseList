const mongoose = require('mongoose');

// Define collection and schema for List
var schema = new mongoose.Schema({
  listTitle: 'string',
  listDescription: 'string'
},{
  collection: "list"
});


module.exports = mongoose.model('List', schema);
