'use strict';

const {Router} = require(`express`);
const {getArticles} = require(`../api/articles`);
const {getAllComments} = require(`../api/comments`);


const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articles = await getArticles();
  res.render(`articles`, {articles: articles.data});
});

myRouter.get(`/categories`, async (req, res) => {
  res.send(`/my/categories`);
});

myRouter.get(`/comments`, async (req, res) => {
  const comments = await getAllComments();
  res.render(`comments`, {comments});
});

module.exports = myRouter;
