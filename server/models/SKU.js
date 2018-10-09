const mongoose = require('mongoose');
const constants = require('../utils/constants');
const Schema = mongoose.Schema;

const skuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  }
});

const SKU = mongoose.model(constants.MODEL_SKU, skuSchema);

module.exports = SKU;

