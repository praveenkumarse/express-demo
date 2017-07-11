var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = {}
var info = new Schema({
    info: [{
        firstName: String,
        lastName: String,
        number: Number
    }]

})

module.exports = mongoose.model("information", info);