var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var autoIncrement = require("mongoose-auto-increment");

var shortwebSchema = new Schema({
  originWebsite: String,
  shortUrl:String
});

// shortwebSchema.plugin(autoIncrement.plugin,{ model: "ShortWeb", field: 'webId' });

module.exports = mongoose.model("Shortweb", shortwebSchema);
