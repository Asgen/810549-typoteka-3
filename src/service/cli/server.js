"use strict";
const express = require(`express`);
const routes = require(`../routes/index`);
const articlesRoutes = require(`../routes/articles`);
const {readJson} = require(`../../utils`);
const {getLogger, startRequest, showStatusCode} = require(`../middleware/logger.js`);
const logger = getLogger();

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

(async function () {
  global.mockFileContent = await readJson(FILENAME);
})();

const app = express();
app.use(express.json());
app.use(startRequest);
app.use(`/`, routes);
app.use(`/articles`, articlesRoutes, showStatusCode);
app.set(`view engine`, `html`);

app.use((req, res) => {
  logger.error(`End request with error 404`);
  res.status(404).send(`Page not found`);
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      // Регистрируем запуск сервера
      logger.info(`server start on ${port}`);
    })
    .on(`error`, (err) => {
      // Логируем ошибку, если сервер не смог стартовать
      logger.error(`Server can't start. Error: ${err}`);
    });
  }
};

