const mongoose = require('mongoose');
const constants = require('../utils/constants');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  fullname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String
  },
  branch: {},
});


userSchema.method('validPassword', function (password) {
  return this.password === password;
});

const User = mongoose.model(constants.MODEL_USER, userSchema);

module.exports = User;

