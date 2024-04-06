"use strict";

const chalk = require(`chalk`);

const showHelp = () => {
  const text = `
    Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>
    Команды:
  `;

  const table = {
    "--help": {описание: `печатает этот текст`},
    "--version": {описание: `выводит номер версии`},
    "--generate <count>": {описание: `формирует файл mocks.json`},
    "--fill <count>": {описание: `формирует fill-db.sql`},
    "--filldb": {описание: `заполняет БД данными через sequelize`},
  };

  console.info(chalk.gray(text));
  console.table(table);
};

module.exports = {
  name: `--help`,
  run: showHelp,
};
