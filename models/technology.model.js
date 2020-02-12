const mongoose = require('mongoose');

var technologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    },
    logo: {
        type: String,
        required: 'Image is required'
    }
});


mongoose.model('Technology', technologySchema);