const mongoose = require('mongoose');
const constants = require('../utils/constants');
const Schema = mongoose.Schema;

const ddoSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  deliveryAgent: {
    _id: String,
    username: String,
    fullname: String,
    email: String,
    phone: String,
  },
  route: {
    _id: String,
    name: String,
  },
  skuList: [],
  log: [],
});

const DDO = mongoose.model(constants.MODEL_DDO, ddoSchema);

module.exports = DDO;

