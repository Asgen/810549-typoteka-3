"use strict";

const api = require(`./instance`).getAPI();

module.exports.getOffers = ({offset, limit, userId, categoryId, withComments} = {}) => {
  console.log(`----------------################`, api);
  return api.load(`/offers`, {params: {limit, offset, userId, categoryId, withComments}});
};
