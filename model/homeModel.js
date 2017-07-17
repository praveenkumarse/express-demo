var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = {}
var info = new Schema({
    info: [{
        user: String,
        firstName: String,
        lastName: String,
        number: Number,
    }]

})

module.exports = mongoose.model("dashboard", info);