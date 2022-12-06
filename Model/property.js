const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const propertySchema= new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique:true,
      max: 200,
    },
    createdBy:{
      type:Schema.Types.ObjectId,
    },
    updatedBy:{
      type:Schema.Types.ObjectId,
    },
    status:{
      type:Number,
    },
    parent_id:{
      type:Schema.Types.ObjectId,
    }
},{timestamps: true})


const Property= new mongoose.model('Property',propertySchema)

module.exports = Property