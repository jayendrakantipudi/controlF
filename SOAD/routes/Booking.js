// const _ = require('lodash');
// const {Booking}=require('../Models/Booking');
// const {Service} = require('../Models/service');
// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();
// const {professional} = require('../Models/professional');
//
// router.post('/booking',async(req, res) => {
// 	let type =await Service.findOne({name:req.body.name});
// 	console.log(req.body.name);
// 	if (!type) return res.status(400).send('Service Does Not Exist!')
//     let prev_bookings = Bookings.find({data: {
//         $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
//     }})
//     let professionals = await professional.find();
//     var dict = {}
//     for (var temp of professionals){
//         dict[temp.id]
//     }
//
//     const book = new Booking({
//         professional:,
//         service:type,
//         slot:req.body.slot,
//
//     });
// 	await book.save()
// 	res.send(Type);
// });
//
// module.exports = router;
