var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: 'admin'
    }
}, {
    timestamps: true
});



UserSchema.pre('save',async function(next) {
    try{
        const passwordSalt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(this.password,passwordSalt);
        this.password=hashPassword;
        next();
    }catch(exception){
        console.log(exception)
    }
  

})

UserSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {

        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });

}

module.exports = mongoose.model('User', UserSchema);