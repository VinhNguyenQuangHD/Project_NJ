const mongoose = require('mongoose');

const Production_Schema = new mongoose.Schema({
    id_sanpham:{
        type: Number,
        required: true,
    },

    Ma_Loai:{
        type: Number,
        required: true,
    },

    TenSP:{
        type: String,
        required: true,
    },

    DonGia:{
        type: Number,
        required: true,
    },

    Hinh:{
        type: String,
        required: true,
    },

    MoTaSP:{
        type: String,
        required: true,
    },
});

const Production_db = mongoose.model('San_Pham', Production_Schema);
module.exports = Production_db;