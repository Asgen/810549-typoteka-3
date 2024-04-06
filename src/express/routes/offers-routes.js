'use strict';
// const querystring = require(`querystring`);
const {Router} = require(`express`);
const {getOffers} = require(`../api/offers`);

const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  try {
    const offers = await getOffers();
    res.render(`offers`, {offers: offers.all});
    // const x = JSON.stringify(offers, null, 4);
    // res.header(`Content-Type`, `application/json`);
    // res.send(x);

  } catch (error) {
    console.log(`---------------============1`, error);
    res.send(error);
  }

});

module.exports = offersRouter;
