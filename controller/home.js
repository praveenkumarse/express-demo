var userInfo = require("./../model/home");

module.exports.controller = function(app) {
    app.get('/info', function(req, res, next) {
        let info;
        userInfo.find({}).then(function(data) {
            res.json({
                info: data[0].info
            });
        }, err => {

        })
    });
    app.post('/add', function(req, res, next) {

        var query = {},
            update = { expire: new Date() },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };
        userInfo.findOneAndUpdate(query, update, options, function(error, result) {
            if (error) return;
            result.info = req.body.info;
            result.save(function(err) {
                if (err) throw err;
                res.json("add data successfully")
            })
        });
    });
    app.delete('/delete/:id', function(req, res, next) {
        userInfo.findOneAndUpdate({}, { $pull: { info: { _id: req.params.id } } },
            function(err, data) {
                if (err) return err;
                res.json("Data delete successfully")
            });
    });
    app.put('/update/:id', function(req, res, next) {
        userInfo.find({}, { info: { $elemMatch: { _id: req.params.id } } },
            function(error, data) {
                userInfo.update({ 'data._id': req.params.id }, {
                    '$set': {
                        'data.$.firstName': req.body.firstName,
                        'data.$.lastName': req.body.firstName,
                        'data.$.number': req.body.number,
                    }
                }, function(err) {
                    if (err) return err;
                    res.json("Update Data Successfully")
                });
            })
    })
}