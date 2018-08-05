/**
 * Created by shahsmit1109@gmail.com
 */
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Hotel', new Schema({
        name: String,
        emailId: String,
        contactNo: String,
        address1: String,
        address2: String,
        area: String,
        city: String,
		description: String
}));
