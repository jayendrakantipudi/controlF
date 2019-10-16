const mongoose= require('mongoose');

const orderItem = new mongoose.Schema({
	service_type:{
	  type:String,
	  required:true,
	},
	cost:{
		type:Number,
		required:true,
	},
	quantity:{
		type:Number,
		required:true,
	}
});

const OrderItem = mongoose.model('OrderItem', orderItem)

exports.OrderItem = OrderItem