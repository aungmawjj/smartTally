const AccessControl = require('accesscontrol');
const constants = require('../utils/constants');

const ac = new AccessControl();

ac.grant(constants.ROLE_ADMIN)
  .resource(constants.MODEL_USER).createAny().readAny().updateAny().deleteAny()
  .resource(constants.MODEL_CROWDAREA).createAny().readAny().updateAny().deleteAny();
  
module.exports.createAny = function(model) {
  return function(req, res, next) {
    const permission = ac.can(req.user.role).createAny(model);
    if(!permission.granted) return res.sendStatus(401);
    req.permission = permission;
    return next();
  };
};

module.exports.readAny = function(model) {
  return function(req, res, next) {
    const permission = ac.can(req.user.role).readAny(model);
    if(!permission.granted) return res.sendStatus(401);
    req.permission = permission;
    return next();
  };
};

module.exports.updateAny = function(model) {
  return function(req, res, next) {
    const permission = ac.can(req.user.role).updateAny(model);
    if(!permission.granted) return res.sendStatus(401);
    req.permission = permission;
    return next();
  };
};

module.exports.deleteAny = function(model) {
  return function(req, res, next) {
    const permission = ac.can(req.user.role).deleteAny(model);
    if(!permission.granted) return res.sendStatus(401);
    req.permission = permission;
    return next();
  };
};


module.exports.createOwn = function(model) {
  return function(req, res, next) {
    const permission = ac.can(req.user.role).createOwn(model);
    if(!permission.granted) return res.sendStatus(401);
    req.permission = permission;
    return next();
  };
};

module.exports.readOwn = function(model) {
  return function(req, res, next) {
    const permission = ac.can(req.user.role).readOwn(model);
    if(!permission.granted) return res.sendStatus(401);
    req.permission = permission;
    return next();
  };
};

module.exports.updateOwn = function(model) {
  return function(req, res, next) {
    const permission = ac.can(req.user.role).updateOwn(model);
    if(!permission.granted) return res.sendStatus(401);
    req.permission = permission;
    return next();
  };
};

module.exports.deleteOwn = function(model) {
  return function(req, res, next) {
    const permission = ac.can(req.user.role).deleteOwn(model);
    if(!permission.granted) return res.sendStatus(401);
    req.permission = permission;
    return next();
  };
};