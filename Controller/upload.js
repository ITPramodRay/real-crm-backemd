const {UploadDataFile, Property} = require('../Model/auth');
const fs = require('fs');
exports.uploadFile = async(req,res)=>{
    try{
        const idata={};
        var image_data=[];
        if(req.files){
            for(var i = 0; i<req.files.length;i++){
                const data = {
                    file : req.files[i].filename,
                    url: req.files[i].path,
                    latsModified:new Date()
                }
               const path = {imgId:i,url:req.files[i].path};
                const newFile = new UploadDataFile(data);
                newFile.save();
                image_data.push(newFile)
                
            }  
            
          res.json({
              status:201,
              message:'Upload Successfully!',
              data:image_data
          })
        }
        else{
            res.json({
                message:"file not uploaded!",
                res:501
            })
        }
     
    }

    catch(error){
        res.json({
            message:'Something is error',
            status:500,
            error:error
        })
    }
}


exports.getUploadFile = async(req,res)=>{
    try{
        const data = await UploadDataFile.find() 
        res.json({
            fileData:data,
            status:200
        })
        
    }
    catch(error){
        res.json({
            message:'Something is error',
            status:500,
            error:error
        })
    }
}

exports.removeUploadFile = async(req,res)=>{  
    try{
        const propertyId = req.body.propertyId;
        const _id = req.params.id;
        await Property.updateOne({_id:propertyId},{$pull : {image:{_id : _id}}})
        const fileData = await UploadDataFile.findOne({_id:_id})
        res.status(204);
        const path = fileData.url
        fs.unlinkSync(path)
        const data = await UploadDataFile.deleteOne({_id:_id}) 
        data.status = 0
        res.status(202)
        res.json({
            message:'Remove successfully!',
            status:202
        })       
    }
    catch(error){
        res.json({
            message:'Something is error',
            status:500,
            error:error
        })
    }
}
