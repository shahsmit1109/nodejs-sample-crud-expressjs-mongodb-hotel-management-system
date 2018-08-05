var mongoose = require("mongoose");
var Booking = require("../model/booking.js");
var Utility = require("../utility.js");
var logger = require("../logger.js");
var Room = require("../model/room.js");
var bookingController = {};
const _ = require('lodash');

bookingController.list = function(req, res) {
    Booking.find({}).exec(function(err, bookings) {
        if (err) {
            logger.error("Error:", err);
        } else {
            res.send(bookings);
        }
    });
};

bookingController.show = function(req, res) {
    Booking.findOne({ _id: req.params.id }).exec(function(err, booking) {
        if (err) {
            logger.error("Error:", err);
        } else {
            res.send(booking)
        }
    });
};

bookingController.create = function(req, res) {
    var booking = new Booking(req.body);
    booking.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(booking._id);
        }
    });
};

bookingController.fetchAllAvailableRooms = function(req, res) {
    Booking.find({hotelId:req.body.hotelId,startDate:{"$gte":new Date(req.body.startDate),"$lte":new Date(req.body.endDate)},endDate:{"$gte":new Date(req.body.startDate),"$lte":new Date(req.body.endDate)}}).exec(function(err, booked) {
          if (err) {
                    logger.error("Error:", err);
                } else {
                alreadyBoooked = booked;
                alreadyBoooked = _.map(booked, 'roomId');
                Room.find({hotelId: req.body.hotelId}).exec(function(err, availableRoom) {
                        if (err) {
                            logger.error("Error:", err);
                        } else {
                            allavailable = _.map(availableRoom, '_id');
                            allavailable = allavailable.map(String);
                             var availableRooms = _.difference(allavailable, alreadyBoooked);
                             res.send(availableRooms);
                        }
                    });
                }
            });



};

module.exports = bookingController;