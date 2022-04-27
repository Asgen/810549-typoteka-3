"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {getRandomInt, shuffle, readContent} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `data/sentences.txt`;
const FILE_TITLES_PATH = `data/titles.txt`;
const FILE_CATEGORIES_PATH = `data/categories.txt`;

const generate = (count, titles, categories, sentences) =>
  Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(0, 5).join(` `),
      fullText: shuffle(sentences)
        .slice(0, getRandomInt(0, sentences.length - 1))
        .join(` `),
      category: shuffle(categories).slice(
          0,
          getRandomInt(0, categories.length - 1)
      ),
      createdDate: new Date().toISOString(),
    }));

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT) {
      console.info(chalk.red(`Не больше ${MAX_COUNT} публикаций`));

      return;
    }

    const content = JSON.stringify(generate(countOffer, titles, categories, sentences), null, 4);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
