const jwt = require('express-jwt');
const express = require('express');

const Logger = require('../utils/Logger');
const config = require('../config');
const DDO = require('../models/DDO');
const Order = require('../models/Order');
const authUtil = require('../utils/authUtil');
const ac = require('../middlewares/accesscontrol');
const constants = require('../utils/constants');

const router = express.Router();

router.use(jwt({
  secret: config.jwtSecret,
  getToken: authUtil.getTokenFromRequest,
}));

function handleDARequest(filter, req, res) {
  return DDO.find({'deliveryAgent._id': req.user._id}).exec()
    .then(result => {
      if(result.length < 1) throw 'No delivery assignment for you';
      return res.json(result);
    })
    .catch(err => {
      Logger.error(err);
      return res.status(400).send(err);
    });
}

router.get('/',
  ac.readOwn(constants.MODEL_DDO),
  function(req, res) {
    const filter = Object.assign({}, req.query);
    delete filter.accessToken;
    if(req.user.role === constants.ROLE_DELIVERYAGENT) {
      return handleDARequest(filter, req, res);
    }
    return DDO.find(filter).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.get('/:_id',
  ac.readOwn(constants.MODEL_DDO),
  function(req, res) {
    return DDO.findOne({_id: req.params._id}).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.get('/:_id/orders',
  ac.readAny(constants.MODEL_ORDER),
  function(req, res) {
    return Order.find({'ddo._id': req.params._id}).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.post('/',
  ac.createAny(constants.MODEL_DDO),
  function(req, res) {
    return DDO.create(req.body)
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.put('/:_id',
  ac.updateAny(constants.MODEL_DDO),
  function(req, res) {
    return DDO.updateOne({_id: req.params._id}, req.body).exec()
      .then(result => {
        if(result.nModified < 1) throw 'Nothing Updated';
        return DDO.findOne({_id: req.params._id}).exec();
      })
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.delete('/:_id',
  ac.deleteAny(constants.MODEL_DDO),
  function(req, res) {
    return DDO.deleteOne({_id: req.params._id}).exec()
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

module.exports = router;