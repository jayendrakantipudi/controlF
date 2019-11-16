const _ = require('lodash');
const {Order} = require('../Models/Order');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Professional} = require('../Models/professional');
const {Slot} = require('../Models/Slot');
const {Service} = require('../Models/service');
const {User} = require('../Models/user')
const {Serviceuser} = require('../Models/Serviceuser')
const OrderItem=require('../Models/OrderItem').OrderItem;
const ServiceType=require('../Models/serviceType').ServiceType;
const {Serviceorder} = require('../Models/Serviceorder')

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
       const service_bookings = await Serviceorder.find({professional:proffs[k]._id, order_date:type.order_date, 'slot._id':type.slot})
         
       if(prof_bookings.length===0 && proffs[k].user._id != type.user_id && service_bookings.length===0)
        {

            type.professional=proffs[k]._id        
            type.is_confirmed = true
            await type.save()
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

    var ordered_date = type.order_date.date.toString() + '/' + type.order_date.month.toString() + '/' + type.order_date.year.toString()
    

    Orderdetails= {
        name:user.name,
        services_chosen:chosen,
        total_cost:type.total_cost,
        date:ordered_date,
        prof_name:professional.user.name,
        prof_phone:professional.phonenumber,
        slot:slot.start_time,
        address:type.address[2],
        city:type.address[3],
    }

    res.send(Orderdetails)
})

router.post('/addorganisation',async(req,res)=>{
    console.log(req.body)
    org_name = req.body.org_name;
    email1 = req.body.email;
    const seruser = new Serviceuser({
        email:email1,
        organisation_name:org_name
    })
    const token=seruser.generateServiceToken()
    seruser.token= token
    await seruser.save()
    res.send(seruser)
})

router.get('/service/orderbooking',async(req,res)=>{
    var res_token = req.query.api;
    let serorg = Serviceuser.find({token:res_token})
    if (!serorg) return res.status(400).send('Organisation Invalid')
    var service_worker = req.query.profession;
    let service = await Service.findOne({service_worker:service_worker})
    let service_type = await ServiceType.findOne({service_type:'Installation','service._id':service._id})
    var total_cost = service_type.cost;
    var order_year = req.query.year;
    var order_month = req.query.month;
    var order_date = req.query.date;
    var phone_number = req.query.phonenumber;
    var username = req.query.username;
    var address = req.query.address;
    var city = req.query.city;
    console.log(service_worker)
    var order = new Serviceorder({
        token:res_token,
        service_name:service.name,
        total_cost:total_cost,
        address:[0,0,address,city],
        phone_number:phone_number,
        user_name:username,
        service_type:service_type.service_type
    })
    order.order_date.year=order_year;
    order.order_date.month=order_month;
    order.order_date.date=order_date;

    const proffs = await Professional.find({profession:service_worker,'locality.3':city})
    console.log(`proffs:${proffs}`)
    const all_slots = await Slot.find()
    console.log(`slots:${all_slots}`)
    var k = null;var s = null;

    for ( k in proffs)
    {

        for(s in all_slots)
        {      
        const prof_bookings = await Order.find({professional:proffs[k]._id, order_date:order.order_date, 'slot._id':all_slots[s]._id})
        const service_bookings = await Serviceorder.find({professional:proffs[k]._id, order_date:order.order_date, 'slot._id':all_slots[s]._id})
        console.log(prof_bookings)
        console.log(service_bookings)
        if(prof_bookings.length===0 && service_bookings.length===0)
        {
            order.profession = proffs[k]._id,
            order.slot = all_slots[s]
            order.save();
            res.send(proffs[k])
            return;
        }
    }
}
    res.send({})
})

module.exports = router;
