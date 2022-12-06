const {Master} = require('../Model/auth');

exports.master = async (req,res) => {
    try{
       
        const data = new Master({
            name: req.body.name,
            type:req.body.type,
            status:1
        })
       data.save();
        res.json({
            status:200,
            data:data
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
exports.getMasterBYId = async (req,res) => {
    try{
        const id = req.params.id
        const data = await Master.findOne({_id:id})
        res.json({
            data:[data],
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

exports.getMaster = async (req,res) => {
    try{
        const type = req.params.type
        const data = await Master.find({type:type})
        if(data){
            res.json({
                data:data,
            status:200
        })
        }
        else{
            const allData = await Master.find();
            res.json({
                data:allData,
                status:200
            })
        }
        
    }
    catch(error){
        res.json({
            message:'Something is error!',
            status:500,
            error:error
        })
    }

}

exports.updateMaster = async (req,res) => {
    try{
        const id= req.params.id
        const data = await Master.updateOne({_id:id},{name:req.body.name},{new:true});
        res.json({
            status:200,
            message:'Updated successfully!'
        })
    }
    catch(error){
        res.json({
            data:data,
            message:'Something is error!',
            status:500,
            error:error
        })
    }

}
exports.removeMaster = async (req,res) => {
    try{
        const _id = req.params.id
        const data = await Master.findOne({_id:_id})
        data.status = 0;
        data.save();
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
