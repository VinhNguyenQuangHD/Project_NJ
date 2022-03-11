const mongoose = require('mongoose');

const Topic_Schema = new mongoose.Schema({
    id_chude:{
        type: Number,
        required: true,
    },

    Chu_de:{
        type: String,
        required: true,
    },
});

const Topic_db = mongoose.model('Chu_de', Topic_Schema);
module.exports = Topic_db;