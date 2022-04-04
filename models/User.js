const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  codename:{
      type: String,
      required: true,
  },

  ages: {
      type: Number,
      required: true,
  },

  gender: {
      type: String,
      required: true,
  },

  sociallink: {
      type: String,
      required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;