const mongoose = require('mongoose');

const LoaiSP_Schema = new mongoose.Schema({
    Ma_Loai:{
        type: Number,
        required: true,
    },

    Ten_loai:{
        type: String,
        required: true,
    },
});

const LoaiSP_db = mongoose.model('.Loai_san_pham', LoaiSP_Schema);
module.exports = LoaiSP_db;