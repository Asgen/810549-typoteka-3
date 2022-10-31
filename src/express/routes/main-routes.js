'use strict';
const {Router} = require(`express`);
const {getArticles, findArticles} = require(`../api/articles`);

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const articles = await getArticles();
  res.render(`articles`, {articles: articles.data});
});

mainRouter.get(`/register`, async (req, res) => {
  res.render(`sign-up`);
});

mainRouter.get(`/login`, async (req, res) => {
  res.render(`login`);
});

mainRouter.get(`/search`, async (req, res) => {
  res.render(`search-result`, req.query);
});
mainRouter.post(`/search`, async (req, res) => {
  const result = await findArticles(req.body.query);
  if (result && result.length) {
    res.render(`search-result`, {articles: result, query: req.body.query});
  } else {
    res.redirect(`/search?query=${req.body.query || ''}`);
  }
});

module.exports = mainRouter;
