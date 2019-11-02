const mongoose= require('mongoose');

const order = new mongoose.Schema({
//	user:{
//	  _id:{
//		  type:String,
//		  required:true
	  // },
//	  name:{
//		type:String,
//		required:true,
//	  },
//	  email:{
//		type:String,
//		required:true
//	  }
//	},

	services_chosen:mongoose.Schema.Types.Mixed,

	total_cost:{
		type:Number,
		required:true,
	}

//	address:{
//		type:String,
//		required:true,
//	}

});

const Order = mongoose.model('Order', order)

exports.Order = Order