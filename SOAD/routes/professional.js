const auth=require('../middleware/auth')
const config=require('config');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const _ = require('lodash')
const {Professional,validate}=require('../Models/professional')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

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

router.get('/isProfessional',auth,async(req,res)=>{
  let professional=await Professional.findOne({"user._id":req.user._id})
  const fact= professional? true: false
  res.send(fact)
})

router.get('/:serviceName',async(req,res)=>{
  const professionals = await Professional.find({profession:req.params.serviceName});
  res.send(professionals);
})


module.exports= router
