const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.getTokenFromRequest = function(req) {
  if (req.query && req.query.accessToken) {
    return req.query.accessToken;
  }
  return null;
};

module.exports.createToken = function(user) {
  return jwt.sign(user, config.jwtSecret);
};