"use strict";

const chalk = require(`chalk`);
const fs = require(`fs/promises`);

const {getRandomInt, shuffle, readContent, getPictureFileName} = require(`../../utils`);

const DEFAULT_COUNT = 5;
const MAX_COUNT = 10;
const MAX_COMMENTS = 5;
const FILE_NAME = `fill-db.sql`;

const FILE_SENTENCES_PATH = `data/sentences.txt`;
const FILE_TITLES_PATH = `data/titles.txt`;
const FILE_COMMENTS_PATH = `data/comments.txt`;
const FILE_CATEGORIES_PATH = `data/categories.txt`;

const PictureRestrict = {
  MIN: 1,
  MAX: 100
};

const USER_ROLES = [`автор`, `читатель`];

const users = [
  {
    email: `ivanov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Иван`,
    lastName: `Иванов`,
    avatar: `avatar1.jpg`,
    role: USER_ROLES[0]
  }, {
    email: `petrov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Пётр`,
    lastName: `Петров`,
    avatar: `avatar2.jpg`,
    role: USER_ROLES[1]
  }
];

const generateComments = (count, articleId, userCount, comments) => (
  Array(count).fill({}).map(() => ({
    userId: getRandomInt(1, userCount),
    articleId,
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateArticles = (count, titles, categoryCount, userCount, sentences, comments) => (
  Array(count).fill({}).map((_, index) => ({
    category: [getRandomInt(1, categoryCount)],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, userCount, comments),
    fullText: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    userId: getRandomInt(1, userCount)
  }))
);

// const generate = (count, titles, categories, sentences, comments) =>
//   Array(count)
//     .fill({})
//     .map(() => ({
//       title: titles[getRandomInt(0, titles.length - 1)],
//       announce: shuffle(sentences).slice(0, 5).join(` `),
//       fullText: shuffle(sentences)
//         .slice(0, getRandomInt(0, sentences.length - 1))
//         .join(` `),
//       category: shuffle(categories).slice(
//           0,
//           getRandomInt(0, categories.length - 1)
//       ),
//       createdDate: new Date().toISOString(),
//       comments: comments.slice(0, getRandomInt(1, 5)).map(() => ({
//         text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `)
//       }))
//     }));

module.exports = {
  name: `--fill`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const commentSentences = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countArticles > MAX_COUNT) {
      console.info(chalk.red(`Не больше ${MAX_COUNT} публикаций`));

      process.exit(1);

      return;
    }

    const articles = generateArticles(countArticles, titles, categories.length, users.length, sentences, commentSentences);
    const comments = articles.flatMap((article) => article.comments);
    const articleCategories = articles.map((article, index) => ({articleId: index + 1, categoryId: article.category[0]}));

    const userValues = users.map(
        ({email, passwordHash, firstName, lastName, avatar, role}) =>
          `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}', '${role}')`
    ).join(`,\n`);

    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const articleValues = articles.map(
        ({title, fullText, picture, userId}) =>
          `('${title}', '${fullText}', '${picture}', ${userId})`
    ).join(`,\n`);

    const articleCategoryValues = articleCategories.map(
        ({articleId, categoryId}) =>
          `(${articleId}, ${categoryId})`
    ).join(`,\n`);

    const commentValues = comments.map(
        ({text, userId, articleId}) =>
          `('${text}', ${userId}, ${articleId})`
    ).join(`,\n`);

    const roleValue = USER_ROLES.map(
        (name) => `('${name}')`
    ).join(`,\n`);

    const content = `
      INSERT INTO roles(name) VALUES ${roleValue};
      INSERT INTO users(email, password_hash, first_name, last_name, avatar, role) VALUES
      ${userValues};
      INSERT INTO categories(name) VALUES
      ${categoryValues};
      ALTER TABLE articles DISABLE TRIGGER ALL;
      INSERT INTO articles(title, full_text, picture, user_id) VALUES
      ${articleValues};
      ALTER TABLE articles ENABLE TRIGGER ALL;
      ALTER TABLE articles_categories DISABLE TRIGGER ALL;
      INSERT INTO articles_categories(article_id, category_id) VALUES
      ${articleCategoryValues};
      ALTER TABLE articles_categories ENABLE TRIGGER ALL;
      ALTER TABLE comments DISABLE TRIGGER ALL;
      INSERT INTO COMMENTS(text, user_id, article_id) VALUES
      ${commentValues};
      ALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
