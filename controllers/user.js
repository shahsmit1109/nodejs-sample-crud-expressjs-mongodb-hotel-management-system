var mongoose = require("mongoose");
var User = require("../model/user.js");
var Utility = require("../utility.js");
var logger = require("../logger.js")

var userController = {};

userController.list = function(req, res) {
    User.find({}).exec(function(err, users) {
        if (err) {
            logger.error("Error:", err);
        } else {
            res.send(users);
        }
    });
};

userController.show = function(req, res) {
    User.findOne({ _id: req.params.id }).exec(function(err, user) {
        if (err) {
            logger.error("Error:", err);
        } else {
            res.send(user)
        }
    });
};

userController.create = function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(user._id);
        }
    });
};

userController.update = function(req, res) {
    var updatedDTO = Utility.onlyNotEmpty(req);
    User.findByIdAndUpdate(req.params.id, { $set: updatedDTO }, { new: true }, function(err,
user) {
        if (err) {
            logger.error(err);
        }
        res.send("Updated Successfully");
    });
};

userController.delete = function(req, res) {
    User.remove({ _id: req.params.id }, function(err) {
        if (err) {
            logger.error(err);
        } else {
            res.send("Deleted Successfully")
        }
    });
};

module.exports = userController;