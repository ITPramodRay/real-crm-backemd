const { ProcessStep } = require("../Model/auth")


exports.processStep = async(req,res)=>{
    try{
        const data = {
            name            :req.body.name,
            stepLabel       :req.body.stepLabel,
            historyLabel    :req.body.historyLabel,
            refrence_link   :req.body.refrence_link,
            createdBy       :req.body.id,
            updatedBy       :req.body.id,
            status          :1
        }
        const newData = new ProcessStep(data);
        newData.save()
        res.json({
            status:201,
            message:'Added Successfully'
        });

    }
    catch(error){
        res.json({
            error:error,
            message:"Something is worng"
        })
    }
}

exports.getProcessStep = async(req,res)=>{
    try{
        const data = await ProcessStep.find()
        res.json({
            processdata:data,
            status:200,
            message:"Ok"
        });

    }
    catch(error){
        res.json({
            error:error,
            message:"Something is worng"
        })
    }
}

exports.getProcessStepById = async(req,res)=>{
    try{
        const id = req.params.id
        const data = await ProcessStep.find({_id:id})
        
        
        res.json({
            processdata:data,
            status:200,
            message:'OK'
        });

    }
    catch(error){
        res.json({
            error:error,
            message:"Something is worng"
        })
    }
}


exports.updateProcessStep = async(req,res)=>{
    try{
        const data = {
            name:req.body.name,
            stepLabel:req.body.stepLabel,
            historyLabel:req.body.historyLabel,
            refrence_link:req.body.refrence_link,
            updatedBy:req.body.id,
            status:1
        }
        const id = req.params.id
        const newData = await ProcessStep.updateOne({_id:id},data,{new:true});
        
        res.json({
            status:204,
            message:'Update Successfully'
        });

    }
    catch(error){
        res.json({
            error:error,
            message:"Something is worng"
        })
    }
}

exports.softDeleteProcessStep = async(req,res)=>{
    try{
        const data = {
            status:0
        }
        const id = req.params.id
        await ProcessStep.updateOne({_id:id},data,{new:true});
        
        res.json({
            status:201,
            message:'Remove Successfully!'
        });

    }
    catch(error){
        res.json({
            error:error,
            message:"Something is worng"
        })
    }
}