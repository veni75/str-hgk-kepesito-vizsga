const mongoose = require('mongoose');

module.exports = mongoose.model('Building', {
    name: {
        type: String
    },
    floors: {
        type: Number
    },
    classrooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }]
}, 'buildings');
