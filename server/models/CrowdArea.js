const mongoose = require('mongoose');
const constants = require('../utils/constants');
const Schema = mongoose.Schema;

const crowdAreaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    latitude: Number,
    longitude: Number,
  },
  population: Number,
  deviceId: Number,
});

const CrowdArea = mongoose.model(constants.MODEL_CROWDAREA, crowdAreaSchema);

module.exports = CrowdArea;

