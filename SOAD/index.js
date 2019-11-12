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
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
temp = [];
connections = [];
var cors = require('cors');
app.use(cors());


if (!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR:jwtPrivateKey is not defined' );
  process.exit()
}

mongoose.connect('mongodb://localhost:27017/User')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(express.static("uploads"));
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/professional',professional)
app.use('/api/service', services);
app.use('/api/serviceType', serviceTypes);
app.use('/api/order', order);




server.listen(process.env.PORT || 3000);
console.log("server running...");

app.get('/message',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  //Disconnect
  socket.on('disconnect',function(data){
    // if(!socket.username) return;
    temp.splice(temp.indexOf(socket.username),1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected : %s sockets connected', connections.length)
  });

  //send message
  socket.on('chat message',function(msg){
    io.sockets.emit('chat message',msg);
  });

  // New User
  socket.on('new user',function(data, callback){
    callback(true);
    socket.username= data;
    temp.push(socket.username);
    updateUsernames();
  })

  function updateUsernames(){
    io.sockets.emit('get users',temp)
  }
})
