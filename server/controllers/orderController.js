const jwt = require('express-jwt');
const express = require('express');

const Logger = require('../utils/Logger');
const config = require('../config');
const Order = require('../models/Order');
const DDO = require('../models/DDO');
const authUtil = require('../utils/authUtil');
const ac = require('../middlewares/accesscontrol');
const constants = require('../utils/constants');

const router = express.Router();

router.use(jwt({
  secret: config.jwtSecret,
  getToken: authUtil.getTokenFromRequest,
}));

function handleDARequest(filter, req, res) { 
  return DDO.findOne({'deliveryAgent._id': req.user._id}).exec()
    .then(ddo => {
      if(!ddo) throw 'No delivery assignment for you';
      filter['ddo._id'] = ddo._id;
      return Order.find(filter).exec();
    })
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      Logger.error(err);
      return res.status(400).send(err);
    });
}

router.get('/',
  ac.readOwn(constants.MODEL_ORDER),
  function(req, res) {
    const filter = Object.assign({}, req.query);
    delete filter.accessToken;
    if(req.user.role === constants.ROLE_DELIVERYAGENT) {
      return handleDARequest(filter, req, res);
    }
    return Order.find(filter).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.get('/:_id',
  ac.readOwn(constants.MODEL_ORDER),
  function(req, res) {
    return Order.findOne({_id: req.params._id}).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });


router.post('/',
  ac.createOwn(constants.MODEL_ORDER),
  function(req, res) {
    req.body.datetime = new Date();
    return Order.create(req.body)
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.put('/:_id',
  ac.updateOwn(constants.MODEL_ORDER),
  function(req, res) {
    return Order.updateOne({_id: req.params._id}, req.body).exec()
      .then(result => {
        if(result.nModified < 1) throw 'Nothing Updated';
        return Order.findOne({_id: req.params._id}).exec();
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
  ac.deleteOwn(constants.MODEL_ORDER),
  function(req, res) {
    return Order.deleteOne({_id: req.params._id}).exec()
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

module.exports = router;