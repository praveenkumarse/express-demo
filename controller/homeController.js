var userInfo = require("./../model/homeModel");
var multer = require('multer')
var upload = multer({ dest: './public/uploads' });
var path = require('path');
var multiparty = require('multiparty');
var jwt = require('jsonwebtoken');
var authConfig = require('./../config/auth');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads')
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(res.end('Only images are allowed'), null)
        }
        callback(null, true)
    }
}).array('file', 12);


module.exports = {
    get_home_info: function(req, res, next) {
        let info;
        var authorization = req.get('Authorization')
        var user = jwt.verify(authorization, authConfig.secret);
        userInfo.find({}, function(err, data) {
            if (err) throw err;
            var temp = data[0].info.filter(function(info) {
                if (info.user === user.email)
                    return info
            })
            if (data) {
                res.json({ info: temp });
            } else {
                res.json({ info: [] })
            }

        });
    },
    post_home_info: function(req, res, next) {
        var user = jwt.verify(req.get('Authorization'), authConfig.secret);
        var data = req.body;
        var id = data._id;
        delete data._id;
        data.user = user.email

        userInfo.findOneAndUpdate({}, { $push: { 'info': data } }, { upsert: true, new: true, setDefaultsOnInsert: true }, function(error, result) {
            if (error) throw error;
            res.json("add data successfully");
        });

    },
    delete_home_info: function(req, res, next) {
        userInfo.findOneAndUpdate({}, {
                $pull: {
                    info: {
                        _id: req.params.id
                    }
                }
            },
            function(err, data) {
                if (err) return err;
                res.json("Data delete successfully")
            });
    },
    update_home_info: function(req, res, next) {
        userInfo.update({
            'info._id': req.params.id
        }, {
            '$set': {
                'info.$.firstName': req.body.firstName,
                'info.$.lastName': req.body.lastName,
                'info.$.number': req.body.number,
            }
        }, function(err, data) {
            if (err) return err;
            res.json(data)
        });
    },
    home_image_upload: function(req, res, next) {
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            console.log("hello ", fields, files)
        });
        upload(req, res, function(err) {
            console.log
            res.end('File is uploaded')
        })

    }
}