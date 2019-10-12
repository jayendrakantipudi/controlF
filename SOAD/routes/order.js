const _ = require('lodash');
const ServiceType=require('../Models/serviceType').ServiceType;
const Service = require('../Models/service').Service;
const OrderItem=require('../Models/OrderItem').OrderItem;
const Order = require('../Models/Order').Order;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/all',async(req, res) => {
	const types = await Order.find();
	res.send(types);
});

router.post('/makeorder',async(req, res) => {
	
	const temp=req.body;

	const order = new Order({
		//_.pick(req.body,['user']),
		services_chosen:{},
		total_cost:0,
		//_.pick(req.body,['address']),
	});

	total_sum = 0
	for (var k in temp) {
		orderItem = await ServiceType.findOne({service_type:k});
		const item = new OrderItem({
			service_type:orderItem.service_type,
			cost:orderItem.cost,
			quantity:temp[k].quantity
		});
		just = orderItem.service_type;
		order.services_chosen[just] = item;

		order.markModified('services_chosen');
		total_sum = total_sum + (orderItem.cost * temp[k]['quantity']);
    }
	order.total_cost = total_sum;

	await order.save()
	res.send(order);
});

module.exports = router;