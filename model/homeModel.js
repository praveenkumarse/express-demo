var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var info = new Schema({
    info: [{
        user: String,
        firstName: String,
        lastName: String,
        number: Number,
    }]

})

var product_list = new Schema({
    product_name: String,
    price: Number,
    image: String,
    discreption: String
})
module.exports = {
    info: mongoose.model("dashboard", info),
    product_list: mongoose.model("product_list", product_list)
} 