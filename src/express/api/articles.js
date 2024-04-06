"use strict";

// const axiosInstance = require(`./instance.js`);
const api = require(`./instance`).getAPI();


// createOffer({ data }) {
//   return this._load(`/offers`, {
//     method: HttpMethod.POST,
//     data,
//   });
// }

module.exports.getArticles = ({offset, limit, userId, categoryId, withComments} = {}) => {
  console.log(`----------------################`, api);
  return api.load(`/articles`, {params: {limit, offset, userId, categoryId, withComments}});
};

// const getArticles = async () => {
//   try {
//     const articles = await axiosInstance.get(`articles`);
//     return articles;
//   } catch (e) {
//     console.error(e);
//     return undefined;
//   }
// };
module.exports.getOffer = ({id, userId, withComments}) => {
  return api.load(`/articles/${id}`, {params: {userId, withComments}});
};

// const addArticle = async (data) => {
//   try {
//     const res = await axiosInstance.post(`articles`, data);
//     return res;
//   } catch (error) {
//     console.error(`Request failed`);
//     return undefined;
//   }
// };

// const findArticles = async (query) => {
//   try {
//     const res = await axiosInstance.get(`/search?query=${query}`);
//     return res.data;
//   } catch (error) {
//     console.error(`Request failed`);
//     return undefined;
//   }
// };

// module.exports = {getArticles, getArticle, addArticle, findArticles};
