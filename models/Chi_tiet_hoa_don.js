const mongoose = require("mongoose");

const BillDetail_Schema = new mongoose.Schema({
    id_chude:{
        type: Number,
        required: true
    },

    id_sanpham:{
        type: Number,
        required: true,
    },

    Thanh_tien:{
        type: Number,
        require: true,
    },

    So_luong:{
        type: Number,
        require: true,
    },

    
});

const BillDetail_db = mongoose.model('Chi_tiet_hoa_don', BillDetail_Schema);
module.exports = BillDetail_db;
