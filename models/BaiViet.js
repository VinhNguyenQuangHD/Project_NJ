const mongoose = require("mongoose");

const BaiViet_Schema = new mongoose.Schema({
    id_chude:{
        type: Number,
        required: true
    },

    Ngay_dang:{
        type: Date,
        require: true,
    },

    Ngay_dang:{
        type: Date,
        require: true,
    },

    Tieu_de:{
        type: String,
        require: true,
    },

    Mo_ta:{
        type: String,
        required: true,
    },

    Hinh_anh:{
        type: String,
        required: true,
    },

    Link_tk:{
        type: String,
    },

    Nang_luong:{
        type: Number,
        required: true,
    }
});

const Baiviet_db = mongoose.model('BaiViet', BaiViet_Schema);
module.exports = Baiviet_db;
