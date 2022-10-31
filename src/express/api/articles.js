"use strict";

const axiosInstance = require(`./index.js`);

const getArticles = async () => {
  try {
    const articles = await axiosInstance.get(`articles`);
    return articles;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const getArticle = async (articleId) => {
  try {
    const articles = await axiosInstance.get(`articles`);
    const articleIndex = articles.data.findIndex((item) => item.id === articleId);
    return articleIndex < 0 ? null : articles.data[articleIndex];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const addArticle = async (data) => {
  try {
    const res = await axiosInstance.post(`articles`, data);
    return res;
  } catch (error) {
    console.error(`Request failed`);
    return undefined;
  }
};

const findArticles = async (query) => {
  try {
    const res = await axiosInstance.get(`/search?query=${query}`);
    return res.data;
  } catch (error) {
    console.error(`Request failed`);
    return undefined;
  }
};

module.exports = {getArticles, getArticle, addArticle, findArticles};
