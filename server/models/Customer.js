const mongoose = require('mongoose');
const constants = require('../utils/constants');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  township: {
    _id: String,
    name: String,
    code: String,
  },
  phone: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  email: {
    type: String,
  },
  route: {
    _id: String,
    name: String,
  },
  gpsLocation: {
    type: String,
  },
  lhc: Boolean,
  lp: String,
  op: String,
});

customerSchema.statics.updateList = function(customers) {
  return new Promise(async (resolve, reject) => {
    try {
      for(let i = 0; i < customers.length; i++){
        await this.updateOne({_id: customers[i]._id}, customers[i]).exec();
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const Customer = mongoose.model(constants.MODEL_CUSTOMER, customerSchema);

module.exports = Customer;

