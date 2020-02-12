const jwt = require('jsonwebtoken');
const ResponseModel = require('../models/response.model');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }

    if (!token) {
        const response = new ResponseModel(403, 'No token provided', { auth: false });
        return res.send(response);
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                const response = new ResponseModel(500, 'Server Error', { auth: false });
                return res.send(response);
            } else {
                req._id = decoded._id;
                next();
            }
        })
    }
}