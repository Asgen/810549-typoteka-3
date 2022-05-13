"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const express = require(`express`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const app = express();

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

app.get(`/`, async (req, res) => {
  const notFoundMessageText = `Not found`;

  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
    sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
  } catch (err) {
    sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
  }
});

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

