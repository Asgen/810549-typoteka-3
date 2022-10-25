'use strict';
const {nanoid} = require(`nanoid`);
const {Router} = require(`express`);
const {MAX_ID_LENGTH, REQUIRED_FIELDS, HttpCode} = require(`../../constants.js`);

const {getLogger} = require(`../middleware/logger.js`);
const logger = getLogger();

const router = new Router();

const checkMockFile = (req, res, next) => {
  if (!global.mockFileContent || !global.mockFileContent.length) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Mock file not fount. Generate one and try again.`);
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);

    return;
  }

  next();
};

router.get(`/`, checkMockFile, async (req, res, next) => {
  res.send(global.mockFileContent);
  next();
});

router.post(`/`, checkMockFile, async (req, res, next) => {
  let sentData = req.body;
  const isValid = REQUIRED_FIELDS.every((item) => Object.keys(sentData).includes(item));

  if (!isValid) {
    res.writeHead(HttpCode.INVALID_DATA);
    res.end(`Please fill all required fields.`);
    logger.error(`End request with error ${HttpCode.INVALID_DATA}`);
    return;
  }

  sentData.createdDate = new Date().toISOString();
  sentData.id = nanoid(MAX_ID_LENGTH);

  global.mockFileContent.push({sentData});

  res.send(sentData);
  next();
});

router.get(`/:articleId`, checkMockFile, async (req, res, next) => {
  const article = global.mockFileContent.find((item) => item.id === req.params.articleId);

  if (!article) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Article not fount.`);
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return;
  }

  res.send(article);
  next();
});

router.put(`/:articleId`, checkMockFile, async (req, res, next) => {

  const articleIndex = global.mockFileContent.findIndex((item) => item.id === req.params.articleId);

  if (articleIndex < 0) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Article not fount.`);
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return;
  }

  let sentData = req.body;
  const isValid = REQUIRED_FIELDS.every((item) => Object.keys(sentData).includes(item));

  if (!isValid) {
    res.writeHead(HttpCode.INVALID_DATA);
    res.end(`Please fill all required fields.`);
    logger.error(`End request with error ${HttpCode.INVALID_DATA}`);
    return;
  }

  global.mockFileContent[articleIndex] = {...global.mockFileContent[articleIndex], ...sentData};

  res.send(global.mockFileContent[articleIndex]);
  next();
});

router.delete(`/:articleId`, checkMockFile, async (req, res, next) => {
  const articleIndex = global.mockFileContent.findIndex((item) => item.id === req.params.articleId);

  if (articleIndex < 0) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Article not fount.`);
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return;
  }

  global.mockFileContent.splice(articleIndex, 1);

  res.send(`Deleted`);
  next();
});

router.get(`/:articleId/comments`, checkMockFile, async (req, res, next) => {
  const article = global.mockFileContent.find((item) => item.id === req.params.articleId);
  res.send(article.comments);
  next();
});

router.post(`/:articleId/comments`, checkMockFile, async (req, res, next) => {
  let sentData = req.body;
  const articleIndex = global.mockFileContent.findIndex((item) => item.id === req.params.articleId);

  if (!sentData || articleIndex < 1) {
    res.writeHead(HttpCode.INVALID_DATA);
    res.end(`Invalid data.`);
    logger.error(`End request with error ${HttpCode.INVALID_DATA}`);
    return;
  }

  const article = global.mockFileContent[articleIndex];

  sentData = {
    id: nanoid(MAX_ID_LENGTH),
    ...sentData
  };

  if (Array.isArray(article.comments)) {
    article.comments.push(sentData);
  } else {
    article.comments = [sentData];
  }

  res.send(article);
  next();
});

router.delete(`/:articleId/comments/:commentId`, checkMockFile, async (req, res, next) => {
  const articleIndex = global.mockFileContent.findIndex((item) => item.id === req.params.articleId);
  const article = global.mockFileContent[articleIndex];

  if (articleIndex < 0 || (!article.comments || article.comments.length < 1)) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Article or comment not fount.`);
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return;
  }

  const commentIndex = article.comments.findIndex((item) => item.id === req.params.commentId);

  if (commentIndex < 0) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Comment not fount.`);
    logger.error(`End request with error ${HttpCode.NOT_FOUND}`);
    return;
  }

  article.comments.splice(commentIndex, 1);
  global.mockFileContent[articleIndex] = article;

  res.send(`Deleted`);
  next();
});


module.exports = router;
