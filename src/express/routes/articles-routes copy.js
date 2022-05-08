'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  res.send(`/`);
});

module.exports = myRouter;
