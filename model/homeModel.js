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

var productList = new Schema({

    name: String,
    cost: Number,
    discreption: String,
    offer: Number,
    image: String
})


module.exports = {
    product_list: mongoose.model("product_list", productList),
    info: mongoose.model("dashboard", info)
}