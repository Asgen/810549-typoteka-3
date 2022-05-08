'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  res.send(`/`);
});

mainRouter.get(`/register`, async (req, res) => {
  res.send(`/register`);
});

mainRouter.get(`/login`, async (req, res) => {
  res.send(`/login`);
});

mainRouter.get(`/search`, async (req, res) => {
  res.send(`/search`);
});

module.exports = mainRouter;
