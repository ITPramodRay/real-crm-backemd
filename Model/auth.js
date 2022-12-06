const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const jwt = require("jsonwebtoken");
const { Int32 } = require('mongodb');
const { Decimal128 } = require('mongodb');

const regSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 200,
      },  
    email: {
        type: String,
        required: true,
        unique: true,
      },  
    password: {
        type: String,
        required: true,
        min: 5
      },
    createdBy:{
        type:String,
      },
      updatedBy:{
        type:String
      },
    role:{
        type:String,
      },
    status:{
        type:String,
        default:'Active',
        required:true
      },
    tokens:[{
        token:{
            type:String,
        }
    }],
    username:{
      type:String,
      unique:true,
      required:true
    },
    flag:{
      type:String
    }
    

},{timestamps: true})


regSchema.methods.generateAuthToken = async function(){
  console.log('schema')
  try{
    const token = jwt.sign({_id:this._id},'anyStringyuweyyuweyuewyuweuewewyuewyuweyuewyuewyewyyuewyuew');
    this.tokens = this.tokens.concat({token:token})
    return token;
  }
    catch(error){
      console.log(error)
    }
  }

  const masterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
        
    },
    status:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true,
    }
  },{timestamps:true})

  const propertyTypeSchema= new mongoose.Schema({
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

  const propertySchema = new mongoose.Schema({
    userId:{
      type:String,
      required:true
    },
    facing_type:{
      type:String
    },
    property_type:{
      type:String,
      required:true,
	index:true
    },
    property_sub_type:{
      type: String,
      required:true
    },
    owner_name:{
      type:String
    },
    mobile:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
      
     
    },
    address:{
      type:String
    },
    location:{
      type:String
    },
    city:{
     type:String
    },
    state:{
      type:String
    },
    pincode:{
      type:Number
    },
    bedrooms:{
      type:Number
    },
    bathrooms:{
      type:Number
    },
    total_floor:{
      type:Number
    },
    floor_number:{
      type:Number
    },
    flooring_type:{
      type:String
    },
    construction_type:{
      type:String
    },
    balconies:{
      type:Number
    },
    furnishing_status:{
      type:String
    },
    listed_by:{
      type:String
    },
    rera_approved:{
      type:String
   
    },
    rera_approved_id:{
      type:String,
   
    },
    lda_approved:{
      type:String
    },
  lda_permit_id:{
      type:String,
     
    },
    description:{
      type:String
    },
    carpet_area:{
      type:Number
    },
    carpet_area_unit_type:{
      type:String
    },
    built_area:{
      type:Number
    },
    builtup_area_unit_type:{
      type:String
    },
    super_area:{
      type:Number
    },
    super_area_unit_type:{
      type:String
    },
    maintenance:{
      type:String
    },
    price:{
      type:String
    },
    project_name:{
      type:String
    },
    ad_title:{
      type:String
    },
    createdBy:{
      type:String
    },
    updatedBy:{
      type:String
    },
    flag:{
      type:Number
    },
    image:{
      type:[]
    },
    width:{
      type:String,
    },
    height:{
      type:String
    }
    },{timestamps: true}) 
  
  const uploadSchema = new mongoose.Schema({
    file:{
      type:{}
    },
    url:{
      type:String
    },
    latsModified:{
      type: Date
    }
  },{timestamps:true})

  const processMappingSchema = new mongoose.Schema({
    formStep:{
      type:String,
    },
    toStep:{
      type: Number
    },
    displayLabel:{
      type:String
    },
    updatedBy:{
      type:String
    },
    createdBy:{
      type:String
    },
    status:{
      type : Number
    },
    role:{
      type:String,
    }
  },{timestamps:true})

  const processStepSchema = new mongoose.Schema({
    name:{
      type:String,
    },
    stepLabel:{
      type:String
    },
    historyLabel:{
      type:String
    },
    refrence_link:{
      type:String
    },
    createdBy:{
      type:String
    },
    updatedBy:{
      type:String
    },
    status:{
      type:String
    },
  },{timestamps:true})

  const propertyCounterSchema = new mongoose.Schema({
    _id :{
      type: String,
      
    },
    sequence_value : {
      type:Number
    }
  })
//    const Master = new mongoose.model('MasterType',masterSchema);
// const NewUser=new mongoose.model('Register',regSchema);

module.exports = ({
  NewUser:new mongoose.model('User',regSchema),
  Master : new mongoose.model('MasterType',masterSchema),
  PropertyType: new mongoose.model('PropertyTypes',propertyTypeSchema),
  Property : new mongoose.model('Property',propertySchema),
  UploadDataFile : new mongoose.model('UploadFile',uploadSchema),
  ProcessMapping : new mongoose.model('ProcessMapping',processMappingSchema),
  ProcessStep : new mongoose.model('ProcessStep',processStepSchema),
  PropertyCounter: new mongoose.model('PropertyCounter',propertyCounterSchema)
})
