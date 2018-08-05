/**
 * Created by shahsmit1109@gmail.com
 */
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Booking', new Schema({
        userId: String,
		hotelId: String,
		roomId:String,
		startDate: Date,
		endDate:Date,
		createdDate:{ type: Date, default: Date.now }
}));
