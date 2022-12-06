const mongoose = require('mongoose');
// mongoose connection
const url = process.env.MongoUrl || 'mongodb://localhost:27017/api'

mongoose.connect( url,{useNewUrlParser:true,
useCreateIndex:true, useFindAndModify:false, 
useUnifiedTopology:true}).then(()=>{console.log('sucess',url)})
.catch((err)=>{console.log(err)})
// create schema

