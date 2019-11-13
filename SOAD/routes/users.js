const auth=require('../middleware/auth')
const config=require('config');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const _ = require('lodash')
const {User,validate}=require('../Models/user')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Professional} = require('../Models/professional');

router.get('/loggedin',auth,async(req,res)=>{
  const user= await User.findById(req.user._id).select('-password')
  res.send(user);
});

router.get('/all',async(req,res)=>{
  const user= await User.find()
  res.send(user);
})

router.post('/showprofile',async(req, res)=>{
  const user= await User.findById(req.body.id).select('-password')
  const professional_details = await Professional.findOne({"user._id":user._id});
  const arr = []
  arr.push(user.name)
  arr.push(user.email)
  arr.push(professional_details.locality)
  arr.push(professional_details.profession)
  arr.push(professional_details.phonenumber)
  res.send(arr);
})

router.post('/',async(req, res)=>{
  const {error} = validate(req.body);
  if(error) return res.status (400).send(error.details[0].message);

  let user =await User.findOne({email:req.body.email});
  if (user) return res.status(400).send('User already registered')

  user= new User(_.pick(req.body,['name','email','password']));
  const salt=await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(user.password,salt)
  /* can also be written as
  user= new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  */

  await user.save()
  const token=user.generateAuthToken();

  userDetails={
    user:user,
    token:token
  }

  res.send(userDetails)

});

module.exports = router;
