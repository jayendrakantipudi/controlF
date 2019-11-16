const _ = require('lodash');
const {Order} = require('../Models/Order');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Professional} = require('../Models/professional');
const {Slot} = require('../Models/Slot');
const {Service} = require('../Models/service');
const {User} = require('../Models/user')
const {Notifications}= require ('../Models/notifications')
const {Chat} = require('../Models/chat')


router.post('/slotbooking',async(req, res) => {
	let type =await Order.findById(req.body.orderid);
	if (!type) return res.status(400).send('Order Does Not Exist!')
    let slot1 = await Slot.findById(req.body.id)
    console.log('called')
    type.slot=slot1
    await type.save()
    console.log(`type:${type}`)
    res.send(type.id);
});

router.post('/booking',async(req,res)=>{
    let type =await Order.findById(req.body.id);
	if (!type) return res.status(400).send('Order Does Not Exist!')
    lat1 = req.body.lat;
    lng1 = req.body.lng;
    address1 = req.body.address;
    city1 = req.body.city;
    type.address=[lat1,lng1,address1,city1]
    service_name = type.service_name;
    let serviceOne = await Service.findOne({name:service_name})
    const value = serviceOne.service_worker;

    const proffs = await Professional.find({profession:value,'locality.3':city1})
    var k = null;
    var flag=0;
    for ( k in proffs)
    {
       const prof_bookings = await Order.find({professional:proffs[k]._id, order_date:type.order_date, 'slot._id':type.slot})
       console.log(prof_bookings)
        if(prof_bookings.length===0)
        {
            type.professional=proffs[k]._id
            await type.save()
						let professional = await Professional.findById(type.professional)
						var notification=new Notifications({from:type.user_id,notification:"You have been alotted a new work!",order_id:type._id,to:professional.user._id})
						await notification.save()
            flag=1;
            break;
        }
    }
    if (flag===0) return res.status(400).send('slot not found')

    const user = await User.findById(type.user_id)
    const professional = await Professional.findById(type.professional)
    const slot = await Slot.findById(type.slot._id)
    console.log(`${slot}`)
    var chosen = [];
    var k = null;
    var temp = type.services_chosen;
    for(k in temp)
    {
        chosen.push(temp[k].service_type)
    }


    Orderdetails= {
				user_id:user._id,
				professional_id:professional.user._id,
        name:user.name,
        services_chosen:chosen,
        total_cost:type.total_cost,
        date:type.order_date,
        prof_name:professional.user.name,
        prof_phone:professional.phonenumber,
        slot:slot.start_time,
        address:type.address[2],
        city:type.address[3],
    }

    res.send(Orderdetails)
})

router.post('/messagenotification',async(req,res)=>{
	var notification=new Notifications({from:req.body.user_id,notification:"A user is saying Helloo....",to:req.body.professional_id,url:req.body.url})
	await notification.save()
	res.send(notification.id)
})


router.post('/notification',async(req,res)=>{
	console.log(req.body)
	const notifications= await Notifications.find({to:req.body.id}).select('notification order_id url');
	const a=notifications.map(noti=>{temp={}; temp['notification']=noti.notification;temp['order_id']=noti.order_id;temp['url']=noti.url; return temp})
	res.send(a);
})


router.post('/chat',async(req,res)=>{
	chat= new Chat({
		from: req.body.from,
		to: req.body.to,
		message: req.body.message
	});
	await chat.save()
	res.send(chat);
})

router.post('/getmessages',async(req,res)=>{
	const prof_to_user=await Chat.find({$or:[{to:req.body.user_id,from:req.body.professional_id},{to:req.body.professional_id,from:req.body.user_id}]})
	res.send(prof_to_user)
})
module.exports = router;
