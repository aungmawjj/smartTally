const mongoose = require('mongoose');
const constants = require('../utils/constants');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  datetime: {
    type: Date,
    required: true,
  },
  ddo: {
    _id: String,
    route: {
      _id: String,
    },
  },
  deliveryAgent: {
    _id: String,
    username: String,
    fullname: String,
    email: String,
    phone: String,
  },
  customer: {
    _id: {
      type: String,
      required: true,
    },
    name: String,
    township: {},
  },
  skuList: [],
  total: Number,
  log: [],
});

const Order = mongoose.model(constants.MODEL_ORDER, orderSchema);

module.exports = Order;

