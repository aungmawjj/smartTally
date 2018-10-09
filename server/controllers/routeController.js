const jwt = require('express-jwt');
const express = require('express');

const Logger = require('../utils/Logger');
const config = require('../config');
const Route = require('../models/Route');
const Customer = require('../models/Customer');
const authUtil = require('../utils/authUtil');
const ac = require('../middlewares/accesscontrol');
const constants = require('../utils/constants');

const router = express.Router();

router.use(jwt({
  secret: config.jwtSecret,
  getToken: authUtil.getTokenFromRequest,
}));

router.get('/',
  ac.readAny(constants.MODEL_ROUTE),
  function(req, res) {
    const filter = Object.assign({}, req.query);
    delete filter.accessToken;
    return Route.find(filter).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.get('/:_id',
  ac.readAny(constants.MODEL_ROUTE),
  function(req, res) {
    return Route.findOne({_id: req.params._id}).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.post('/',
  ac.createAny(constants.MODEL_ROUTE),
  function(req, res) {
    let route = {};
    return Route.create(req.body.route)
      .then(result => {
        route = result;
        return Customer.updateList(req.body.customers.map(c => {
          c.route = route;
          return c;
        }));
      })
      .then(() => {
        return res.json(route);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.put('/:_id',
  ac.updateAny(constants.MODEL_ROUTE),
  function(req, res) {
    let route = {};
    return Route.updateOne({_id: req.params._id}, req.body.route).exec()
      .then(() => {
        route = req.body.route;
        return Customer.updateList(req.body.customers);
      })
      .then(() => {
        return res.json(route);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.delete('/:_id',
  ac.deleteAny(constants.MODEL_ROUTE),
  function(req, res) {
    return Customer.updateMany({'route._id': req.params._id}, {route: {}}).exec()
      .then(() => {
        return Route.deleteOne({_id: req.params._id}).exec();
      })
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.get('/:_id/customers',
  ac.readAny(constants.MODEL_CUSTOMER),
  function(req, res) {
    const filter = Object.assign({}, req.query);
    delete filter.accessToken;
    filter['route._id'] = req.params._id;
    return Customer.find(filter).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });


module.exports = router;