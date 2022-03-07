const mongoose = require("mongoose");

const InforSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    Code_name:{
        type: String,
        required: true,
    },

    ages: {
        type: Number,
        required: true,
    },

    Gender: {
        type: String,
        required: true,
    },

    Social_link: {
        type: String,
        required: true,
    },
});

const Infor_user = mongoose.model("Infor", InforSchema);
module.exports = Infor_user;