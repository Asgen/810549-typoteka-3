'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  res.render(`my-tickets`);
});

myRouter.get(`/categories`, async (req, res) => {
  res.send(`/my/categories`);
});

myRouter.get(`/comments`, async (req, res) => {
  res.render(`comments`);
});

module.exports = myRouter;
