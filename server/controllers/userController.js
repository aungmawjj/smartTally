const jwt = require('express-jwt');
const express = require('express');

const Logger = require('../utils/Logger');
const config = require('../config');
const User = require('../models/User');
const authUtil = require('../utils/authUtil');
const ac = require('../middlewares/accesscontrol');
const constants = require('../utils/constants');

const router = express.Router();

router.use(jwt({
  secret: config.jwtSecret,
  getToken: authUtil.getTokenFromRequest,
}));


router.get('/', 
  ac.readAny(constants.MODEL_USER),
  function(req, res) {
    const filter = Object.assign({}, req.query);
    delete filter.accessToken;
    return User.find(filter).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.get('/:_id',
  ac.readAny(constants.MODEL_USER),
  function(req, res) {
    return User.findOne({_id: req.params._id}).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });


router.post('/',
  ac.createAny(constants.MODEL_USER),
  function(req, res) {
    return User.create(req.body)
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.put('/',
  ac.updateOwn(constants.MODEL_USER),
  function(req, res) {
    if(req.body.role) return res.status(400).send('Cannot update role yourself');
    return User.updateOne({_id: req.user._id}, req.body).exec()
      .then(result => {
        if(result.nModified < 1) throw 'Nothing Updated';
        return User.findOne({_id: req.user._id}).exec();
      })
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.put('/:_id',
  ac.updateAny(constants.MODEL_USER),
  function(req, res) {
    return User.updateOne({_id: req.params._id}, req.body).exec()
      .then(result => {
        if(result.nModified < 1) return res.status(400).send('Nothing Updated');
        return User.findOne({_id: req.params._id}).exec();
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
  ac.deleteAny(constants.MODEL_USER),
  function(req, res) {
    return User.deleteOne({_id: req.params._id}).exec()
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

module.exports = router;