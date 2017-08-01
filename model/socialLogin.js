var mongoose = require('mongoose');
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    google: {
        type: [{
            id: { type: String },
            token: { type: String },
            refreshToken: { type: String },
            name: { type: String },
            email: { type: String }
        }]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SocialLogin', UserSchema);