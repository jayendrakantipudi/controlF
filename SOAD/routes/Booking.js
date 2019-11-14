const _ = require('lodash');
const {Order} = require('../Models/Order');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Professional} = require('../Models/professional');
const {Slot} = require('../Models/Slot');
const {Service} = require('../Models/service');

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
    service_name = type.service_name;
    let serviceOne = await Service.findOne({name:service_name})

    const value = serviceOne.service_worker;

    const proffs = await Professional.findOne({profession:value})

    type.professional=proffs,
    type.address=[lat1,lng1,address1,city1]

    await type.save()
    res.send(type)
})

module.exports = router;
