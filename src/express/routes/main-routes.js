'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  res.render(`main`);
});

mainRouter.get(`/register`, async (req, res) => {
  res.render(`sign-up`);
});

mainRouter.get(`/login`, async (req, res) => {
  res.render(`login`);
});

mainRouter.get(`/search`, async (req, res) => {
  res.render(`search-results`);
});

module.exports = mainRouter;
