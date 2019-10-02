const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth=require('./routes/auth');
const professional=require('./routes/professional')
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR:jwtPrivateKey is not defined' );
  process.exit()
}

mongoose.connect('mongodb://localhost:27017/User')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/professional',professional)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
