const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth=require('./routes/auth');
const professional=require('./routes/professional');
const services=require('./routes/services');
const serviceTypes=require('./routes/serviceTypes');
const order=require('./routes/order');
const express = require('express');
const app = express();
var cors = require('cors');
const slot = require('./routes/slot');
const location = require('./routes/location');
const booking = require('./routes/Booking');


app.use(cors());

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
app.use('/api/service', services);
app.use('/api/serviceType', serviceTypes);
app.use('/api/order', order);
app.use('/api/slot',slot);
app.use('/api/location',location);
app.use('/api/booking',booking);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
