const auth=require('../middleware/auth')
const config=require('config');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const _ = require('lodash')
const {Professional,validate}=require('../Models/professional')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Service}= require('../Models/service')

router.post('/',auth,async(req, res)=>{
  const {error} = validate(req.body);
  if(error) return res.status (400).send(error.details[0].message);

  let professional =await Professional.findOne( {"user.email":req.body.user.email});
  if (professional) return res.status(400).send('You\'ve already registered as a Professional')

  professional= new Professional(_.pick(req.body,['user','profession','phonenumber']));
  /* can also be written as
  user= new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  */

  await professional.save()
  res.send(professional)

});

router.post('/saveAddress',async(req,res)=>{
  console.log(`backend ${req.body.user_id}`)
  let type =await Professional.findOne({"user._id":req.body.user_id});
  if (!type) return res.status(400).send('Professional Does Not Exist!')
  lat1 = req.body.lat;
  lng1 = req.body.lng;
  address1 = req.body.address;
  city1 = req.body.city;
  type.locality=[lat1,lng1,address1,city1]

  await type.save()
  console.log(`backend2 ${type}`)
  res.send(type)
})

router.get('/isProfessional',auth,async(req,res)=>{
  let professional=await Professional.findOne({"user._id":req.user._id})
  const fact= professional? true: false
  res.send(fact)
})


router.get('/professions',async(req,res)=>{
  const professions=await Service.find().select('service_worker')
  const a = professions.map(profession=>{var temp;temp=profession.service_worker;return temp})
  res.send(a)
})


router.get('/:serviceName',async(req,res)=>{
  const professionals = await Professional.find({profession:req.params.serviceName});
  res.send(professionals);
})



module.exports= router
