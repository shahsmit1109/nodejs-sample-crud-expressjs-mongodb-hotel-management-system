var mongoose = require("mongoose");
var Hotel = require("../model/hotel.js");
var Utility = require("../utility.js");
var logger = require("../logger.js")

var hotelController = {};

hotelController.list = function(req, res) {
    Hotel.find({}).exec(function(err, hotels) {
        if (err) {
            logger.error("Error:", err);
        } else {
            res.send(hotels);
        }
    });
};

hotelController.show = function(req, res) {
    Hotel.findOne({ _id: req.params.id }).exec(function(err, hotel) {
        if (err) {
            logger.error("Error:", err);
        } else {
            res.send(hotel)
        }
    });
};

hotelController.create = function(req, res) {
    var hotel = new Hotel(req.body);
    hotel.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(hotel._id);
        }
    });
};

hotelController.update = function(req, res) {
    var updatedDTO = Utility.onlyNotEmpty(req);
    Hotel.findByIdAndUpdate(req.params.id,{ $set: updatedDTO }, { new: true }, function(err,
hotel) {
        if (err) {
            logger.error(err);
        }
        res.send("Updated Successfully");
    });
};

hotelController.delete = function(req, res) {
    Hotel.remove({ _id: req.params.id }, function(err) {
        if (err) {
            logger.error(err);
        } else {
            res.send("Deleted Successfully")
        }
    });
};

module.exports = hotelController;