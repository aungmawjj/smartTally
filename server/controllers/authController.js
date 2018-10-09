const express = require('express');
const jwt = require('express-jwt');

const config = require('../config');
const passport = require('../middlewares/passport');
const Logger = require('../utils/Logger');
const authUtil = require('../utils/authUtil');

const User = require('../models/User');

const router = express.Router();

router.use(passport.initialize());

router.post('/login',
  passport.authenticate('local',{
    session: false
  }),
  function(req, res) {
    const user = req.user.toJSON();
    delete user.password;
    const resBody = {
      accessToken: authUtil.createToken(user),
      loginUser: user
    };
    res.json(resBody);
  });

router.get('/loginUser',
  jwt({
    secret: config.jwtSecret,
    getToken: authUtil.getTokenFromRequest,
  }),
  function(req, res) {
    User.findOne({_id: req.user._id}).exec()
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        Logger.error(err);
        return res.status(400).send(err);
      });
  });

module.exports = router;