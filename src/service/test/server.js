"use strict";
const express = require(`express`);
const routes = require(`../routes/index`);
const articlesRoutes = require(`../routes/articles`);
const {readJson} = require(`../../utils`);
const {getLogger, startRequest, showStatusCode} = require(`../middleware/logger.js`);
const logger = getLogger();

const FILENAME = `mocks.json`;

(async function () {
  global.mockFileContent = await readJson(FILENAME);
})();

const server = express();
server.use(express.json());
server.use(startRequest);
server.use(`/`, routes);
server.use(`/articles`, articlesRoutes, showStatusCode);
// server.set(`view engine`, `html`);

server.use((req, res) => {
  logger.error(`End request with error 404`);
  res.status(404).send(`Page not found`);
});

module.exports = server;

