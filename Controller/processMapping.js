const {ProcessMapping} = require('../Model/auth');

exports.processMapping = async (req,res) => {
    try{
       console.log(req.body.displayLabel)
        const data = new ProcessMapping({
            role:req.body.role,
            formStep:req.body.formStep,
              toStep:req.body.toStep,
              displayLabel:req.body.displayLabel,
              updatedBy:req.body.id,
              createdBy:req.body.id,
              status:1
        })
        data.save();
        res.json({
            status:201,
            message:'Added Successfully!'
        })
    }
    catch(error){
        res.json({
            message:'Something is error!',
            status:500,
            error:error
        })
    }

}
exports.getProcessMappingBYId = async (req,res) => {
    try{
        const id = req.params.id;
        const data = await ProcessMapping.findOne({_id:id})
        
        res.json({
            data:data,
            status:200
        })
    }
    catch(error){
        res.json({
            message:'Something is error!',
            status:500,
            error:error
        })
    }

}

exports.getProcessMapping = async (req,res) => {
    try{
        const data = await ProcessMapping.find()
            res.send(data)
            res.json({
            status:200
        })
        
    }
    catch(error){
        res.json({
            message:'Something is error!',
            status:500,
            error:error
        })
    }

}

exports.updateProcessMapping = async (req,res) => {
    try{
        const id= req.params.id
        const updateData = {
            role:req.body.role,
            formStep:req.body.formStep,
              toStep:req.body.toStep,
              displayLabel:req.body.displayLabel,
              updatedBy:req.body.id,
        }
        console.log(updateData)
        await ProcessMapping.updateOne({_id:id},updateData,{new:true});
        res.json({
            status:204,
            message:'Updated successfully!'
        })
    }
    catch(error){
        res.json({
            message:'Something is error!',
            status:500,
            error:error
        })
    }

}
exports.removeProcessMapping = async (req,res) => {
    try{
        const _id = req.params.id
        const data = await ProcessMapping.findOne({_id:_id})
        data.status = 0;
        data.save();
        res.send(data)
        res.json({
            status:202,
            message:'Deleted Successfully!'
        })
    }
    catch(error){
        res.json({
            message:'Something is error!',
            status:500,
            error:error
        })
    }

}