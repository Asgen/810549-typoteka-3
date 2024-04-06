"use strict";

const axiosInstance = require(`./instance.js`);

const getAllComments = async () => {
  try {
    const articles = await axiosInstance.get(`articles`);
    const comments = articles.data.map((item) => ({
      articleId: item.id,
      data: item.comments,
    }));

    return comments;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

module.exports = {getAllComments};
