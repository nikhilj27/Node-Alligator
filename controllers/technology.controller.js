const mongoose = require('mongoose');
const ResponseModel = require('../models/response.model');

const Technology = mongoose.model('Technology');


module.exports.getAllTechnologies = (req, res) => {
    Technology.find({}, (err, doc) => {
        if (!err) {
            const techList = doc;
            if (techList.length !== 0) {
                const response = new ResponseModel(200, 'Technology list', techList);
                res.send(response);
            } else {
                const response = new ResponseModel(204, 'Empty Technology list', null);
                res.send(response);
            }
        } else {
            const response = new ResponseModel(500, 'Error occur', null);
            res.send(response);
        }
    });
}


module.exports.addTechnology = (req, res, next) => {
    const technology = new Technology();
    technology.name = req.body.name;
    technology.description = req.body.description;
    technology.logo = req.body.logo;

    technology.save((err, doc) => {
        if (!err) {
            const response = new ResponseModel(200, 'Technology added successfully', doc);
            res.send(response);
        } else {
            return next(err);
        }
    });
}