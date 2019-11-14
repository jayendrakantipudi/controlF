//const config=require('config');
const Joi= require('joi');
const mongoose= require('mongoose');

const notificationSchema = new mongoose.Schema({
	from : {
    type:Object,
    required:true
  },
	notification: String,
	url:String,
	to:{
    type:Object,
    required:true
  }
});

const Notifications = mongoose.model('Notificaations', notificationSchema)

exports.Notifications = Notifications;
