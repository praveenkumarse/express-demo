var { Info, product_list } = require("./../model/homeModel");
var multer = require('multer')
var upload = multer({ dest: './public/uploads' });
var path = require('path');
var multiparty = require('multiparty');
var jwt = require('jsonwebtoken');
var authConfig = require('./../config/key');
var { as } = require('async');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(res.end('Only images are allowed'), null)
        }
        callback(null, true)
    }
}).single('image');


module.exports = {
    get_home_info: function (req, res, next) {
        Info.find({}, function (err, data) {
            if (err) throw err;
            res.json({
                info: data
            })
        });
    },
    post_home_info: function (req, res, next) {
        var user = jwt.verify(req.get('Authorization'), authConfig.secret);
        var data = req.body;
        var id = data._id;
        delete data._id;
        data.user = user.email

        userInfo.findOneAndUpdate({}, { $push: { 'info': data } }, { upsert: true, new: true, setDefaultsOnInsert: true }, function (error, result) {
            if (error) throw error;
            res.json("add data successfully");
        });

    },
    delete_home_info: function (req, res, next) {
        userInfo.findOneAndUpdate({}, {
            $pull: {
                info: {
                    _id: req.params.id
                }
            }
        },
            function (err, data) {
                if (err) return err;
                res.json("Data delete successfully")
            });
    },
    update_home_info: function (req, res, next) {
        userInfo.update({
            'info._id': req.params.id
        }, {
                '$set': {
                    'info.$.firstName': req.body.firstName,
                    'info.$.lastName': req.body.lastName,
                    'info.$.number': req.body.number,
                }
            }, function (err, data) {
                if (err) return err;
                res.json(data)
            });
    },
    home_image_upload: function (req, res, next) {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
        });
        upload(req, res, function (err) {
            res.end('File is uploaded')
        })

    },

    add_product_list: (req, res, next) => {
        new Promise((resolve, reject) => {
            upload(req, res, function (err) {
                if (err) throw err;
                resolve(req);
            })
        }).then((req) => {
            var data = req.body;
            data.image = req.file.originalname
            let datasave = new product_list(data);
            datasave.save((err, result) => {
                if (err) throw err;
                res.json({
                    info: "save data successfully"
                })
            })
        })

    },
    get_product_list: (req, res, next) => {
       product_list.find({},(err,data)=>{
           if(err) throw err;
           res.json({
               data:data
           })
       })
    }
}