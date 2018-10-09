const mongoose = require('mongoose');
const constants = require('../utils/constants');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  log: [],
});

const Route = mongoose.model(constants.MODEL_ROUTE, routeSchema);

module.exports = Route;

