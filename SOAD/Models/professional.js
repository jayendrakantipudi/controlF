const config=require('config');
const Joi= require('joi');
const mongoose= require('mongoose');

const professionalSchema=new mongoose.Schema({
  user:{
    _id:{
        type:String,
        required:true},
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true
    }
  },
  profession:{
    type:String,
    enum:['carpenter','plumber','electrician','hair stylist','physician'],
    required:true,
    lowercase:true
  },
  phonenumber:{
    type:String,
    required:true,
  },
  locality:{
    type:Array,
    required:false
  },
});

const Professional= mongoose.model('Professional',professionalSchema)
function validateProfessional(professional){
  const schema={
    user:Joi.object().required(),
    profession:Joi.string().required(),
    phonenumber:Joi.string().trim().regex(/^[0-9]{7,10}$/).required()
  };
  return Joi.validate(professional,schema)
}

exports.enumValues = ['carpenter','plumber','electrician','hair stylist','physician']
exports.Professional = Professional;
exports.validate =validateProfessional;
