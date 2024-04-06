"use strict";
const express = require(`express`);
const http = require(`http`);
const sequelize = require(`../lib/sequelize`);
const {API_PREFIX} = require(`../../constants`);

// const routes = require(`../routes/index`);
// const articlesRoutes = require(`../routes/articles`);
const routes = require(`../api`);
// const {readJson} = require(`../../utils`);
const {getLogger, startRequest} = require(`../middleware/logger.js`);
const logger = getLogger();

const DEFAULT_PORT = 3000;
// const FILENAME = `mocks.json`;

// (async function () {
//   global.mockFileContent = await readJson(FILENAME);
// })();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use((req, res, next) => {
  res.set(`Cache-Control`, `no-store`);
  next();
});
app.use(startRequest);
app.use(API_PREFIX, routes);
// app.use(`/`, routes);
// app.use(`/articles`, articlesRoutes, showStatusCode);
// app.set(`view engine`, `html`);

app.use((req, res) => {
  logger.error(`End request with error 404`);
  res.status(404).send(`Page not found`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      server.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });

    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  }
};

