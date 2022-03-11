const mongoose = require('mongoose');

const Per_Schema = new mongoose.Schema({
    Ma_quyen:{
        type: Number,
        required: true,
    },

    Ten_quyen:{
        type: String,
        required: true,
    },
});

const Quyen_db = mongoose.model('Quyen_truy_cap', Per_Schema);
module.exports = Quyen_db;