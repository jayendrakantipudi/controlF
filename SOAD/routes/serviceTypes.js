const _ = require('lodash');
const ServiceType=require('../Models/serviceType').ServiceType;
const Service = require('../Models/service').Service;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/all',async(req, res) => {
	const types = await ServiceType.find();
	res.send(types);
});

router.get('/:name',async(req, res) => {
	const types = await ServiceType.find({"service.name":req.params.name});
	res.send(types);
});

router.post('/addType',async(req, res) => {
	let type =await Service.findOne({name:req.body.name});
	console.log(req.body.name);
	if (!type) return res.status(400).send('Service Does Not Exist!')
	const Type = new ServiceType({
		service:type,
		service_type:req.body.service_type,
		cost:req.body.cost
	});

	await Type.save()
	res.send(Type);
});

module.exports = router;