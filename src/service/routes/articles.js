'use strict';
const {nanoid} = require(`nanoid`);
const {Router} = require(`express`);
const {MAX_ID_LENGTH, REQUIRED_FIELDS, HttpCode} = require(`../../constants.js`);


const router = new Router();

const checkMockFile = (res) => {
  if (!global.mockFileContent) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Mock file not fount. Generate one and try again.`);
  }
};

router.get(`/`, async (req, res) => {
  checkMockFile(res);
  res.send(global.mockFileContent);
});

router.post(`/`, async (req, res) => {
  checkMockFile(res);
  let sentData = req.body;
  const isValid = REQUIRED_FIELDS.every((item) => Object.keys(sentData).includes(item));

  if (!isValid) {
    res.writeHead(HttpCode.INVALID_DATA);
    res.end(`Please fill all required fields.`);
    return;
  }

  sentData.createdDate = new Date().toISOString();
  sentData.id = nanoid(MAX_ID_LENGTH);

  global.mockFileContent.push({sentData});

  res.send(sentData);
});

router.get(`/:articleId`, async (req, res) => {
  checkMockFile(res);
  const article = global.mockFileContent.find((item) => item.id === req.params.articleId);

  if (!article) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Article not fount.`);
    return;
  }

  res.send(article);
});

router.put(`/:articleId`, async (req, res) => {
  checkMockFile(res);

  const articleIndex = global.mockFileContent.findIndex((item) => item.id === req.params.articleId);

  if (articleIndex < 0) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Article not fount.`);
    return;
  }

  let sentData = req.body;
  const isValid = REQUIRED_FIELDS.every((item) => Object.keys(sentData).includes(item));

  if (!isValid) {
    res.writeHead(HttpCode.INVALID_DATA);
    res.end(`Please fill all required fields.`);
    return;
  }

  global.mockFileContent[articleIndex] = {...global.mockFileContent[articleIndex], ...sentData};

  res.send(global.mockFileContent[articleIndex]);
});

router.delete(`/:articleId`, async (req, res) => {
  checkMockFile(res);

  const articleIndex = global.mockFileContent.findIndex((item) => item.id === req.params.articleId);

  if (articleIndex < 0) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Article not fount.`);
    return;
  }

  global.mockFileContent.splice(articleIndex, 1);

  res.send(`Deleted`);
});

router.get(`/:articleId/comments`, async (req, res) => {
  checkMockFile(res);

  const article = global.mockFileContent.find((item) => item.id === req.params.articleId);
  res.send(article.comments);
});

router.post(`/:articleId/comments`, async (req, res) => {
  checkMockFile(res);
  let sentData = req.body;
  console.log(`*******`, sentData);
  const articleIndex = global.mockFileContent.findIndex((item) => item.id === req.params.articleId);

  if (!sentData || articleIndex < 1) {
    res.writeHead(HttpCode.INVALID_DATA);
    res.end(`Invalid data.`);
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
});

router.delete(`/:articleId/comments/:commentId`, async (req, res) => {
  checkMockFile(res);

  const articleIndex = global.mockFileContent.findIndex((item) => item.id === req.params.articleId);
  const article = global.mockFileContent[articleIndex];

  if (articleIndex < 0 || (!article.comments || article.comments.length < 1)) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Article or comment not fount.`);
    return;
  }

  const commentIndex = article.comments.findIndex((item) => item.id === req.params.commentId);

  if (commentIndex < 0) {
    res.writeHead(HttpCode.NOT_FOUND);
    res.end(`Comment not fount.`);
    return;
  }

  article.comments.splice(commentIndex, 1);
  global.mockFileContent[articleIndex] = article;

  res.send(`Deleted`);
});


module.exports = router;
