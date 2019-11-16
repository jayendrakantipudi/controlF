//const config=require('config');
const Joi= require('joi');
const mongoose= require('mongoose');

const notificationSchema = new mongoose.Schema({
	from : {
    type:String,
    required:true
  },
	notification: String,
  order_id:String,
	to:{
    type:String,
    required:true
  },
	date:{
		type:Date,
		required:true,
		default:Date.now
	},
url:{
	type:String,
	required:false
}

});

const Notifications = mongoose.model('Notifications', notificationSchema)

exports.Notifications = Notifications;
