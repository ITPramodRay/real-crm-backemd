const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const masterSchema = new mongoose.Schema({
  name:{
      type:String,
      required:true
      
  },
  status:{
      type:Number,
      required:true
  },
  type:{
      type:String,
      required:true,
  }
})
 const Master = new mongoose.model('MasterType',masterSchema);

 

// const NewUser = new mongoose.model('Register',regSchema);
module.exports = Master