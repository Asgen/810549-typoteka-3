"use strict";

const chalk = require(`chalk`);
const packageJsonFile = require(`../../../package.json`);

const showVersion = () => {
  console.info(`App version: ${chalk.blue(packageJsonFile.version)}`);
};

module.exports = {
  name: `--version`,
  run: showVersion,
};
