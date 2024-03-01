const mongoose = require('mongoose');

const publicationsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    paintingTechnique: {
        type: String,
        required: true,
    },
    artPicture: {
        type: String, 
        required: true,
    },
    certificate: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    // M -> 1
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    // M -> M
    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

});

const Publication = mongoose.model('Publication', publicationsSchema);

module.exports = Publication;