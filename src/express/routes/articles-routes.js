'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, async (req, res) => {
  res.render(`category`);
});

articlesRouter.get(`/add`, async (req, res) => {
  res.render(`ticket-edit`);
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  res.render(`ticket-edit`);
});

articlesRouter.get(`/:id`, async (req, res) => {
  res.render(`ticket`);
});


module.exports = articlesRouter;
