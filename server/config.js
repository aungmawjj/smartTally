const path = require('path');

const config = {};

config.host = '0.0.0.0';
config.port = 9099;

config.logFile = path.join(__dirname, './log/smart_tally.log');
config.logLevel = 'debug';
// error: 0,
// warn: 1,
// info: 2, 
// verbose: 3,
// debug: 4,
// silly: 5

config.client = path.join(__dirname, './client');

config.mongodbUri = 'mongodb://localhost:27017/smartTally';
config.jwtSecret = 'jwt_secret_123';

config.mqtt = {
  url: "mqtts://kaa.ninja:8883",
  options: {
    username: "amaw",
    password: "amaw@kaa"
  },
  topic: 'smartTally/crowdArea'
},

module.exports = config;