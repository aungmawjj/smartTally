const mongoose = require('mongoose');

const config = require('../config');
const User = require('../models/User');
const constants = require('../utils/constants');

mongoose.connect(config.mongodbUri);

const user = {
  username: 'admin',
  password: 'admin',
  fullname: 'Root User',
  role: constants.ROLE_ADMIN,
};

User.create(user)
  .then(result => {
    return console.log(result);
  })
  .catch(err => {
    console.log('Error', err);
  });