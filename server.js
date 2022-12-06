const Express = require("express");
var cors = require('cors')
var app = Express();
const bodyParser = require('body-parser');
require('dotenv').config()
// const fileUpload = require('express-fileupload');
// app.use(fileUpload());
app.use(Express.json())
const path = require("path");
const port = process.env.Port || 8080;
require('./Database/db')
var multer  = require('multer');


// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get('/', (request, response) => {
    response.send({
        message: 'Node.js and Express REST API'}
    );
});
app.use('/api',async(req,res)=>{
    console.log("hlo",req.body)
})
app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });
// const jobRoute = require('./router/router')
// app.use('/api',jobRoute)
// app.use('/uploads', Express. static(path.join(__dirname, '/uploads')))

     

app.listen(port, () => { console.log('running at',port) });
app.set(port)