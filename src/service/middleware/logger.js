'use strict';
require(`dotenv`).config();
const {HttpCode} = require(`../../constants.js`);
const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`,
},
require(`pino`).multistream(
    [
      {stream: process.stdout},
      {stream: require(`pino`).destination(`logs/pino-logger.log`)},
    ]
)
);

module.exports = {
  logger,
  // Метод всегда возвращает новый логгер, унаследованный
  // от стандартного логгера. В метод можно передать
  // специфичные настройки для нового экземпляра класса.
  getLogger(options = {}) {
    return logger.child(options);
  },
  startRequest(req, res, next) {
    logger.debug(`Start blabla`);
    logger.debug(`Start request ${req.method.toUpperCase()}${req.url}`);
    next();
  },
  showStatusCode(req, res) {
    if (res.statusCode === HttpCode.OK) {
      logger.info(`Request finished with status code ${res.statusCode}`);
      return;
    }

    logger.error(`End request with error ${res.statusCode}`);
    return;

  },
};
