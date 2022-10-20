"use strict";
const chalk = require(`chalk`);
const express = require(`express`);
const routes = require(`../routes/index`);
const articlesRoutes = require(`../routes/articles`);
const {readJson} = require(`../../utils`);
const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

(async function () {
  global.mockFileContent = await readJson(FILENAME);
})();

const app = express();
app.use(express.json());
app.use(`/`, routes);
app.use(`/articles`, articlesRoutes);
app.set(`view engine`, `html`);


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};

