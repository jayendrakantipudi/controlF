//const config=require('config');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Service = require('../Models/service').Service;

router.get('/all', async(req, res) => {
	const services = await Service.find();
	res.send(services);
});

router.get('/:name', async(req, res) => {
	const service = await Service.findOne({name:req.params.name});
	res.send(service);
});

router.post('/', async(req, res) => {
	let service =await Service.findOne({name:req.body.name});
	if (service) return res.status(400).send('Service already Exists!')
	service = new Service({
		name: req.body.name,
		about: req.body.about,
		service_worker: req.body.service_worker
	});
	await service.save()
	 res.send(service);
});

module.exports = router;
