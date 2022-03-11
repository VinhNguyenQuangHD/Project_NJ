const mongoose = require('mongoose');

const Bill_Schema = new mongoose.Schema({
    id_hoadon:{
        type: Number,
        required: true,
    },

    Ngay_lapHD:{
        type: Date,
        required: true,
    },

    TongTien:{
        type: Number,
        required: true,
    },

    NguoiDung:{
        type: String,
        required: true,
    },
});

const Bill_db = mongoose.model('Hoa_don', Bill_Schema);
module.exports = Bill_db;