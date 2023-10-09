const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'banking.log' }),
  ],
});
logger.httpStream = {
    write: function (message) {
      logger.info(message.trim());
    },
  };

module.exports = logger;
