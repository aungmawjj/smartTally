const config = require('../config');
const { createLogger, format, transports } = require('winston');

const myFormat = format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const Logger = createLogger({
  level: config.logLevel,
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
    myFormat
  ),
  transports: [
    new transports.Console({}),
    new transports.File({ filename: config.logFile })
  ],
  exitOnError: false
});

module.exports = Logger;
