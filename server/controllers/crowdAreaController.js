const jwt = require('express-jwt');
const express = require('express');

const Logger = require('../utils/Logger');
const config = require('../config');
const CrowdArea = require('../models/CrowdArea');
const authUtil = require('../utils/authUtil');
const ac = require('../middlewares/accesscontrol');
const constants = require('../utils/constants');

const router = express.Router();

router.use(jwt({
  secret: config.jwtSecret,
  getToken: authUtil.getTokenFromRequest,
}));

router.get('/',
  ac.readAny(constants.MODEL_CROWDAREA),
  function(req, res) {
    const filter = Object.assign({}, req.query);
    delete filter.accessToken;
    return CrowdArea.find(filter).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.get('/:_id',
  ac.readAny(constants.MODEL_CROWDAREA),
  function(req, res) {
    return CrowdArea.findOne({_id: req.params._id}).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.post('/',
  ac.createAny(constants.MODEL_CROWDAREA),
  function(req, res) {
    return CrowdArea.create(req.body)
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

router.put('/:_id',
  ac.updateAny(constants.MODEL_CROWDAREA),
  function(req, res) {
    return CrowdArea.updateOne({_id: req.params._id}, req.body).exec()
      .then(result => {
        if(result.nModified < 1) throw 'Nothing Updated';
        return CrowdArea.findOne({_id: req.params._id}).exec();
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
  ac.deleteAny(constants.MODEL_CROWDAREA),
  function(req, res) {
    return CrowdArea.deleteOne({_id: req.params._id}).exec()
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

module.exports = router;