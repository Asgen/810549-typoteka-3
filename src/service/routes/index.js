'use strict';
const {Router} = require(`express`);
const {readContent} = require(`../../utils`);
const CATEGORIES_FILE_PATH = `data/categories.txt`;


const router = new Router();

router.get(`/`, async (req, res) => {
  res.send(`my-tickets`);
});

router.get(`/categories`, async (req, res) => {
  const categories = await readContent(CATEGORIES_FILE_PATH);
  res.send(categories);
});

router.get(`/search`, async (req, res) => {
  const q = req.query.query;
  const result = global.mockFileContent.filter((item) => {
    return item.title.split(` `).includes(q);
  });
  res.send(result);
});

module.exports = router;
