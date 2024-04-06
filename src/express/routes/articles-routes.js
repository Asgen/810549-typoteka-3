'use strict';
const querystring = require(`querystring`);
const {Router} = require(`express`);
const {getArticles, getArticle, addArticle} = require(`../api/articles`);

const articlesRouter = new Router();

articlesRouter.get(`/`, async (req, res) => {
  try {
    const articles = await getArticles();
    res.render(`articles`, {articles: articles.data});
  } catch (error) {
    console.log(`---------------============`, error);
    res.send(error);
  }

});

articlesRouter.get(`/category/:id`, async (req, res) => {
  res.render(`category`);
});

articlesRouter.get(`/add`, async (req, res) => {
  res.render(`article-add`, req.query);
});
articlesRouter.post(`/add`, async (req, res) => {
  const result = await addArticle(req.body);
  if (result) {
    res.redirect(`/my`);
  } else {
    const query = querystring.stringify({...req.body});
    res.redirect(`add?${query}`);
  }
});

articlesRouter.get(`/edit/:articleId`, async (req, res) => {
  const article = await getArticle(req.params.articleId);
  res.render(`ticket-details`, {article});
});

articlesRouter.get(`/:id`, async (req, res) => {
  res.render(`ticket`);
});


module.exports = articlesRouter;
