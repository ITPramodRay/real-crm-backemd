const express = require('express');
const router = express.Router();

const {
    signUp,login,changepassword, getUser, getUserById, updateUser, 
    softDeleteUser} = require('../Controller/auth');

const { master, getMaster, updateMaster, removeMaster, getMasterBYId 
} = require('../Controller/master'); 

const { 
    processMapping, getProcessMapping, 
    getProcessMappingBYId, updateProcessMapping, 
    removeProcessMapping } = require('../Controller/processMapping');
const { processStep, getProcessStep, getProcessStepById, updateProcessStep, softDeleteProcessStep } = require('../Controller/processStep');

const {addPropertyTypes, getPropertyTypes, getByTypePropertyTypes, updatePropertyTypes,softDeletePropertyTypes,addProperty, getProperty, getPropertyById, 
    updateProperty, softDeleteProperty,getPropertyByType } = require('../Controller/property');

const { uploadFile, getUploadFile, removeUploadFile } = require('../Controller/upload');

const upload = require('../Middleware/upload');


// User Api
router.post('/register',signUp);
router.get('/register',getUser);
router.get('/register/:id',getUserById);
router.post('/login', login);
router.put('/change-password/:id',changepassword);
router.put('/update-user/:id',updateUser);
router.put('/remove-user/:id',softDeleteUser);


// Api for Property Types
router.post('/property-types',addPropertyTypes);
router.get('/property-types',getPropertyTypes);
router.get('/property-types/:type',getByTypePropertyTypes);
router.put('/property-types/:id',updatePropertyTypes);
router.put('/remove-property-types/:id',softDeletePropertyTypes);
// router.put('/category/:id',changepassword);

// Api for Property

router.post('/property',addProperty);
router.get('/property/:type',getPropertyByType);
router.get('/property-by/:id',getPropertyById);
router.put('/update-property/:id',updateProperty);
router.put('/remove-property/:id', softDeleteProperty);


// Api for Master
router.post('/master', master);
router.get('/master/:id', getMasterBYId);
router.get('/masters/:type', getMaster);
router.put('/update-master/:id', updateMaster)
router.put('/remove-master/:id', removeMaster)


// Api for Upload file
router.post('/upload-file', upload.array('file', 12),uploadFile)
router.get('/upload-file',getUploadFile);
router.put('/remove-file/:id',removeUploadFile)

// Api for Process Mapping
router.post('/process-mapping/', processMapping);
router.get('/process-mapping/', getProcessMapping);
router.get('/process-mapping/:id', getProcessMappingBYId);
router.put('/update-process-mapping/:id', updateProcessMapping)
router.put('/remove-process-mapping/:id', removeProcessMapping)


// Api for Process Step
router.post('/process-step/', processStep);
router.get('/process-step/', getProcessStep);
router.get('/process-step/:id', getProcessStepById);
router.put('/update-process-step/:id', updateProcessStep)
router.put('/remove-process-step/:id', softDeleteProcessStep)

module.exports = router
