const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use('/crowdAreas', require('./crowdAreaController'));
router.use('/users', require('./userController'));
router.use('/auth', require('./authController'));

module.exports = router;