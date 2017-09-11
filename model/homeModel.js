var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const baseOptions = {
    discriminatorKey: '__type',
    collection: 'data'
}
const Base = mongoose.model('Base', new mongoose.Schema({}, baseOptions));

const Info = Base.discriminator('Info', new mongoose.Schema({
    info: [{
        user: String,
        firstName: String,
        lastName: String,
        number: Number,
    }]
}));

const product_list = Base.discriminator('product_list', new mongoose.Schema({
    product_name: String,
    cost: Number,
    image: String,
    discreption: String
}));

module.exports = {
    Info,
    product_list
}; 
