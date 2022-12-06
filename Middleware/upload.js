const path = require("path");
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage:storage,
    fileFilter: function(req,file,callback){
        callback(null,true)
    }, 
   
})


module.exports = upload;

// const util = require("util");
// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");

// var storage = new GridFsStorage({
//   url: "mongodb://localhost:27017/bezkoder_files_db",
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-bezkoder-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: "file",
//       filename: `${Date.now()}-bezkoder-${file.originalname}`
//     };
//   }
// });

// var uploadFile = multer({ storage: storage }).single("file");
// var uploadFilesMiddleware = util.promisify(uploadFile);
// module.exports = uploadFilesMiddleware;