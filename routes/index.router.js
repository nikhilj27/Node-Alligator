const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlTechnology = require('../controllers/technology.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userprofile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/getAllTechnology', jwtHelper.verifyJwtToken, ctrlTechnology.getAllTechnologies);
router.post('/addTechnology', jwtHelper.verifyJwtToken, ctrlTechnology.addTechnology);

module.exports = router;