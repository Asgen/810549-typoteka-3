'use strict';
require(`dotenv`).config();
const {HttpCode} = require(`../../constants.js`);
const pino = require(`pino`);

const streams = [
  {level: `debug`, stream: process.stdout},
  {level: `debug`, stream: pino.destination(`logs/all.log`)}];

const logger = pino({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`,
}, pino.multistream(streams)
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
    logger.debug(`Start request ${req.method.toUpperCase()}${req.url}`);
    next();
  },
  showStatusCode(req, res) {
    if (res.statusCode === HttpCode.OK) {
      logger.info(`Request finished with status code ${res.statusCode}`);
      return;
    }
  },
  lostRoutes(req, res) {
    res.status(404).send(`Page not found`);
    logger.error(`End request with error 404`);
  }
};
