var mongoose = require("mongoose");
var Room = require("../model/room.js");
var Utility = require("../utility.js");
var logger = require("../logger.js")

var roomController = {};

roomController.list = function(req, res) {
    Room.find({hotelId: req.params.hotelId}).exec(function(err, rooms) {
        if (err) {
            logger.error("Error:", err);
        } else {
            res.send(rooms);
        }
    });
};

roomController.show = function(req, res) {
    Room.findOne({ _id: req.params.id }).exec(function(err, room) {
        if (err) {
            logger.error("Error:", err);
        } else {
            res.send(room)
        }
    });
};

roomController.create = function(req, res) {
    var room = new Room(req.body);

    room.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(room._id);
        }
    });
};

roomController.update = function(req, res) {
    var updatedDTO = Utility.onlyNotEmpty(req);
    Room.findByIdAndUpdate(req.params.id, { $set: updatedDTO }, { new: true }, function(err,
room) {
        if (err) {
            logger.error(err);
        }
        res.send("Updated Successfully");
    });
};

roomController.delete = function(req, res) {
    Room.remove({ _id: req.params.id }, function(err) {
        if (err) {
            logger.error(err);
        } else {
            res.send("Deleted Successfully")
        }
    });
};

module.exports = roomController;