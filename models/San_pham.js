const mongoose = require('mongoose');

const Production_Schema = new mongoose.Schema({
    idsanpham:{
        type: Number,
        required: true,
    },

    maloai:{
        type: Number,
        required: true,
    },

    tensp:{
        type: String,
        required: true,
    },

    dongia:{
        type: Number,
        required: true,
    },

    hinh:{
        type: String,
        required: true,
    },

    noidung:{
        type: String,
        require: true,
    },

    luottheodoi:{
        type: Number,
        required: true,
    },

    danhgia:{
        type: Number,
        required: true,
    },
});

const Production_db = mongoose.model('San_Pham', Production_Schema);
module.exports = Production_db;