const { NewUser } = require('../Model/auth');
const bycrypt = require('bcrypt')
const nodemailer = require("nodemailer");


exports.signUp = async (req, res, next)=> {
    console.log("Hlo", req.body, res.body)
   
   

}

exports.getUser = async (req, res) => {
    try {
        const data = await NewUser.find();
        res.json({
            data: data,
            status: 200,
            message: 'ok'
        });
        res.status(200)
    }

    catch (err) {
        res.status(500).json({ 'error': err })
    }
}
exports.getUserById = async (req, res) => {
    try {
        const _id = req.params.id
        const data = await NewUser.find({ _id: _id });
        res.json({
            data: data,
            status: 200,
            message: 'ok'
        });
        res.status(200)
    }

    catch (err) {
        res.status(500).json({ 'error': err })
    }
}
exports.updateUser = async (req, res) => {

    try {
        const _id = req.params.id;
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await NewUser.findOne({ email: email })
        const isMatch = await bycrypt.compare(password, userEmail.password);

        if (isMatch) {
            const hashpassword = await bycrypt.hash(password, salt);
            const newData = {
                name: req.body.name,
                email: req.body.email,
                password: hashpassword,
                role: req.body.role,
                status: req.body.status,
                updatedBy: req.body.id,
                status: req.body.status,
                username: req.body.username,
                flag: 1
            }
            const data = await Property.updateOne({ _id: _id }, newData, { new: true });
            res.json({
                data: data,
                status: 204,
                message: 'Updated successfully',
            })

        }
        else {
            res.status(500);
            res.send('Invalid Password');
        }

    }
    catch (err) {
        res.status(500).json({ 'error': err })
    }
}
exports.softDeleteUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await NewUser.findOne({ _id: _id })
        data.flag = 0
        data.save();
        res.json({
            status: 202,
            message: "Removed Successfully!"
        })

    }
    catch (err) {
        res.status(500).json({ 'error': err })
    }
}

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await NewUser.findOne({ email: email })
        const isMatch = await bycrypt.compare(password, userEmail.password);

        if (isMatch) {
            if (userEmail.status === 'Active') {
                const id = userEmail.id
                const token = await userEmail.generateAuthToken();
                userEmail.save();
                res.status(201)
                res.json({
                    id: id,
                    token: token,
                    status: 'ok',
                    message: "Login is Successfully"
                });
                // const data = new User(req.body)
                userEmail.save();

            }

            else {
                res.json({
                    message:'User has not authentication!'
                });
            }
        }
        else {
            res.status(500);
            res.send('Invalid Password');
        }

    }
    catch (error) {
        res.status(400).send('invalid details');
    }

}

exports.changepassword = async (req, res) => {

    try {
        console.log('This is 2')
        const _id = req.body.id
        const newpassword = req.body.newpassword;
        const password = req.body.password;
        console.log(newpassword)
        const userEmail = await NewUser.findOne({ _id: _id })
        console.log(userEmail.password)
        const isMatch = await bycrypt.compare(password, userEmail.password);
        if (isMatch) {
            console.log('This is 4')
            const token = await userEmail.generateAuthToken();
            const salt = await bycrypt.genSalt(10);
            hashpassword = await bycrypt.hash(newpassword, salt)
            //   const pass = userEmail.update(_id,{password:hashpassword})
            userEmail.password = hashpassword
            // const data = new User(req.body)
            console.log('updated', userEmail.password)
            userEmail.save();
            res.json({
                token: token,
                status: 200,
                message: "Password is Updated!"
            });

        }
        else {
            res.send('Invalid Password');
        }
    }
    catch (error) {
        res.status(500).send('Something worng!');
    }
}

