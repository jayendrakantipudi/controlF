const auth=require('../middleware/auth')
const config=require('config');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const _ = require('lodash')
const {Professional,validate}=require('../Models/professional')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Order} = require('../Models/Order')
const {Serviceorder} = require('../Models/Serviceorder')
const {User} = require('../Models/user')
const {Slot} = require('../Models/Slot')
const {Service}= require('../Models/service')

router.post('/',auth,async(req, res)=>{
  const {error} = validate(req.body);
  console.log(req.body)
  if(error) return res.status (400).send(error.details[0].message);

  let professional =await Professional.findOne( {"user.email":req.body.user.email});
  if (professional) return res.status(400).send('You\'ve already registered as a Professional')

  professional= new Professional(_.pick(req.body,['user','profession','phonenumber']));
  professional.locality = [0,0,'None',req.body.city]
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
  const serv = await Service.findOne({name:req.params.serviceName})
  const professionals = await Professional.find({profession:serv.service_worker});
  res.send(professionals);
})


router.get('/all',async(req,res)=>{
  const professionals = await Professional.find();
  res.send(professionals);
})

router.post('/myorders',async(req, res)=>{
  const thisprofessional = await Professional.findOne({'user._id':req.body.id})
  const order = await Order.find({professional:thisprofessional._id,is_confirmed:true});
  var item = null;
  orders = [];
  for(item in order){
    temp =   order[item]; 
    var user = await User.findById(temp.user_id)
    var slot = await Slot.findById(temp.slot._id)  
    var ordered_date = temp.order_date.date.toString() + '/' + temp.order_date.month.toString() + '/' + temp.order_date.year.toString()
    var ser_chosen= [];var item2=null;
    for(item2 in temp.services_chosen)
    {
      ser_chosen.push(item2)
    }
    var Orderdetails= {
      is_organisation:false,
      services_chosen:ser_chosen,
      total_cost:temp.total_cost,
      date:ordered_date,
      user_name:user.name,
      user_email:user.email,
      slot:slot.start_time,
      address:temp.address[2],
      city:temp.address[3],
  }
  orders.push(Orderdetails)
  }
const serord = await Serviceorder.find({professional:thisprofessional._id})
console.log(serord)
var item = null;
for(item in serord){
  temp =   serord[item]; 
  var slot = await Slot.findById(temp.slot._id)  
  var ordered_date = temp.order_date.date.toString() + '/' + temp.order_date.month.toString() + '/' + temp.order_date.year.toString()
  var Orderdetails= {
    is_organisation:true,
    services_chosen:[temp.service_type],
    total_cost:temp.total_cost,
    date:ordered_date,
    user_name:temp.user_name,
    user_phone:temp.phone_number,
    slot:slot.start_time,
    address:temp.address[2],
    city:temp.address[3],
}
orders.push(Orderdetails)
}

  res.send(orders);
})



module.exports= router
