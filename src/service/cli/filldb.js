"use strict";

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);

const {getLogger} = require(`../middleware/logger.js`);

const logger = getLogger();
const {readContent, getRandomSubarray, getRandomInt, shuffle} = require(`../../utils`);
const DEFAULT_COUNT = 10;

const FILE_SENTENCES_PATH = `data/sentences.txt`;
const FILE_TITLES_PATH = `data/titles.txt`;
const FILE_COMMENTS_PATH = `data/comments.txt`;
const FILE_CATEGORIES_PATH = `data/categories.txt`;

const generateOffers = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    categories: getRandomSubarray(categories),
    comments: comments.slice(0, getRandomInt(1, 5)).map(() => ({
      text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `)
    })),
    title: titles[getRandomInt(0, titles.length - 1)],
    description: shuffle(sentences).slice(0, 5).join(` `),
    type: `продам`,
    sum: getRandomInt(10, 100500),
  }))
);

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();

      const sentences = await readContent(FILE_SENTENCES_PATH);
      const titles = await readContent(FILE_TITLES_PATH);
      const categories = await readContent(FILE_CATEGORIES_PATH);
      const comments = await readContent(FILE_COMMENTS_PATH);

      const {Category, Offer} = defineModels(sequelize);
      await sequelize.sync({force: true});

      const categoryModels = await Category.bulkCreate(
          categories.map((item) => ({
            name: item
          }))
      );

      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
      const offers = generateOffers(countOffer, titles, categoryModels, sentences, comments);
      const offerPromises = offers.map(async (offer) => {
        const offerModel = await Offer.create(offer, {include: [Aliase.COMMENTS]});
        await offerModel.addCategories(offer.categories);
      });

      await Promise.all(offerPromises);

      logger.info(`All good`);
      process.exit(0);
    } catch (err) {
      logger.error(`An error occurred: ${err}`);
      process.exit(1);
    }
    // ...
  }
};
