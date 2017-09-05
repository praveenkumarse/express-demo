var mongoose = require('mongoose');
var db = {};
db.connect = function() {
    mongoose.connect('mongodb://localhost/database', { useMongoClient: true }, function(err) {
        if (err) {
            console.log("error in connecting database", err)
        } else {
            console.log("connecting database")
        }

    });
}
module.exports = db;