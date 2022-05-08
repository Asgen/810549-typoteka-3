'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, async (req, res) => {
  res.send(`/articles/category/:id`);
});

articlesRouter.get(`/add`, async (req, res) => {
  res.send(`/articles/add`);
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  res.send(`/articles/edit/:id`);
});

articlesRouter.get(`/:id`, async (req, res) => {
  res.send(`/articles/:id`);
});


module.exports = articlesRouter;
