var userInfo = require("./../model/home");

module.exports.controller = function(app) {
    app.get('/info', function(req, res, next) {
        userInfo.find({}, function(err, data) {
            res.send(data[0]);
        })
    });
    app.post('/add', function(req, res, next) {
        var info = new userInfo({
            info: req.body.info
        })
        info.save(function(err) {
            if (err) throw err;
            res.send("add data successfully")
        })
    });
    app.delete('/delete/:id', function(req, res, next) {

        userInfo.findByIdAndUpdate({
            $pull: {
                events: {
                    _id: req.params.id
                }
            }
        }, function(err) {
            if (err) throw err;
            else res.send("deleted")
        });
    });
    app.put('/update/:id', function(req, res, next) {

    });
}