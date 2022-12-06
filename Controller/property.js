const { Property, PropertyType, PropertyCounter } = require('../Model/auth');

// CRUD operation Property Types
exports.addPropertyTypes = async (req, res) => {
    const data = await PropertyType.find()
    console.log(data)
    const nameExist = await PropertyType.findOne({ name: req.body.name });
    if (nameExist) {
        res.status(409).json({ "error": 'Name already Exist' })
    }

    // const parentData = await Property.findOne({_id:req.body.parent_id})

    const user = new PropertyType({
        name: req.body.name,
        parent_id: req.body.parent_id,
        createdBy: req.body.userId,
        updatedBy: req.body.userId,
        status: 1
    })
    console.log('user')
    try {
        user.save()
        res.json({
            status: 201,
            message: 'Property added successfully!',
        });
    }

    catch (err) {
        res.status(500).json({ 'error': err })
    }

}
exports.getPropertyTypes = async (req, res) => {
    try {

        const findProperty = await PropertyType.find();
        console.log(findProperty)
        res.status(200);
        res.json({
            propertyData: findProperty,
            Status: 200,
            message: 'Property Data',
        });
    }

    catch (err) {
        res.status(400).json({ 'error': err })
    }

}
exports.getByTypePropertyTypes = async (req, res) => {
    try {
        const type = req.params.type;
        const findProperty = await PropertyType.findOne({ name: type });
        res.json({
            propertyData: findProperty,
            status: 200,
            message: 'Property Data',
        });
    }

    catch (err) {
        res.json({
            error: err,
            message: 'Something is wrong!',
            status: 500
        })
    }

}

exports.updatePropertyTypes = async (req, res) => {

    const _id = req.body.id;

    console.log(_id)
    try {
        const updatedata = await PropertyType.updateOne({ _id: _id }, {
            name: req.body.name,
            updatedBy: req.body.userId
        }, { new: true });
        res.json({
            status: 204,
            message: 'Property type updated successfully!',
        });
    }

    catch (err) {
        res.status(500).json({ error: err.message, message: 'Something is wrong!', status: 500 })
    }

}

exports.softDeletePropertyTypes = async (req, res) => {
    const _id = req.body.id;
    // const data = await Property.findOne({_id:_id})


    try {
        await PropertyType.updateOne({ _id: _id }, {
            status: 0
        }, { new: true })
        //    updatedata.save()
        res.json({
            status: 202,
            message: 'Property type deleted successfully!',
        });
    }

    catch (err) {
        res.status(500).json({ error: err, message: "Something is wrong!", status: 500 })
    }

}

// CRUD operation Property
exports.addProperty = async (req, res) => {
    const property = await PropertyType.findOne({name:req.body.property_type})
    const data = {
        facing_type: req.body.facing_type,
        userId: req.body.userId,
        property_type: property._id,
        property_sub_type: req.body.property_sub_type,
        owner_name: req.body.owner_name,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
        location: req.body.location,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        total_floor: req.body.total_floor,
        floor_number: req.body.floor_number,
        flooring_type: req.body.flooring_type,
        balconies: req.body.balconies,
        furnishing_status: req.body.furnishing_status,
        listed_by: req.body.listed_by,
        rera_approved: req.body.rera_approved,
        lda_approved: req.body.lda_approved,
        description: req.body.description,
        carpet_area: req.body.carpet_area,
        carpet_area_unit_type: req.body.carpet_area_unit_type,
        built_area: req.body.built_area,
        builtup_area_unit_type: req.body.builtup_area_unit_type,
        super_area: req.body.super_area,
        super_area_unit_type: req.body.super_area_unit_type,
        maintenance: req.body.maintenance,
        price: req.body.price,
        project_name: req.body.project_name,
        ad_title: req.body.ad_title,
        createdBy: req.body.userId,
        updatedBy: req.body.userId,
        construction_type: req.body.construction_type,
        rera_approved_id: req.body.rera_approved_id,
        lda_permit_id: req.body.lda_permit_id,
        image: req.body.image,
        width:req.body.width,
        height:req.body.height,
        flag: 1
    }
    try {
        const addData = new Property(data)
        addData.save();
        console.log(addData)
        res.json({
            status: 201,
            message: 'Property added successfully!',
            data: addData
        });
    }

    catch (err) {
        res.json({
            error: err,
            message: "Something is wrong!",
            status: 500,
        })
    }
}

exports.getPropertyByType = async (req, res) => {
    try {
        const property_type = req.params.type
	const pType = await PropertyType.findOne({name:property_type})
        const data = await Property.find({property_type:pType._id})
	console.log(data)
        if(data){
            res.json({
                status: 200,
                meassage: 'ok',
                propertyData: data
            })
        }
        else {
            const data = await Property.find()
            res.json({
                status: 200,
                meassage: 'ok',
                propertyData: data
            })
        }

    }

    catch (error) {
        res.json({
            status: 500,
            message: 'Something is wrong!',
            error: error
        })
    }
}


exports.getPropertyById = async (req, res) => {
    const id = req.params.id;
    const data = await Property.findOne({ _id: id });
    console.log(data)
    try {
        res.json({
            status: 200,
            meassage: 'ok',
            propertyData: [data]
        })
    }

    catch (error) {
        res.json({
            status: 500,
            message: 'Something is wrong!',
            error: error
        })
    }
}


exports.updateProperty = async (req, res) => {
    console.log("Update property")
    const _id = req.params.id;
    const newData = {
        userId: req.body.userId,
        property_type: req.body.property_type,
        property_sub_type: req.body.property_sub_type,
        owner_name: req.body.owner_name,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
        location: req.body.location,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        total_floor: req.body.total_floor,
        floor_number: req.body.floor_number,
        flooring_type: req.body.flooring_type,
        balconies: req.body.balconies,
        furnishing_status: req.body.furnishing_status,
        listed_by: req.body.listed_by,
        rera_approved: req.body.rera_approved,
        lda_approved: req.body.lda_approved,
        description: req.body.description,
        carpet_area: req.body.carpet_area,
        carpet_area_unit_type: req.body.carpet_area_unit_type,
        built_area: req.body.built_area,
        builtup_area_unit_type: req.body.builtup_area_unit_type,
        super_area: req.body.super_area,
        super_area_unit_type: req.body.super_area_unit_type,
        maintenance: req.body.maintenance,
        price: req.body.price,
        project_name: req.body.project_name,
        ad_title: req.body.ad_title,
        updatedBy: req.body.userId,
        construction_type: req.body.construction_type,
        rera_approved_id: req.body.rera_approved_id,
        lda_permit_id: req.body.lda_permit_id,
        image: req.body.image,
        width:req.body.width,
        height:req.body.height,
        flag: 1

    }
    try {
        const data = await Property.updateOne({ _id: _id }, newData, { new: true });
        res.json({
            data: data,
            status: 204,
            message: 'Updated successfully',
        })
    }
    catch (error) {
        res.json({
            status: 500,
            message: "Something is error",
            error: error
        })
    }
}

exports.softDeleteProperty = async (req, res) => {
    const _id = req.params.id;

    try {
        const data = await Property.findOne({ _id: _id });
        data.flag = 0
        data.save()
        res.json({
            status: 204,
            message: 'Updated successfully',
        })
    }
    catch (error) {
        res.json({
            status: 500,
            message: "Something is error",
            error: error
        })
    }
}
