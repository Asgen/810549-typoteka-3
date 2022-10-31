"use strict";

const express = require(`express`);
const path = require(`path`);

const mainRoutes = require(`./routes/main-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);

const DEFAULT_PORT = 8081;
const PUBLIC_DIR = `public`;

const app = express();
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.set(`Cache-Control`, `no-store`);
  next();
});

app.use(`/`, mainRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);

// Шаблоны
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

// Подключение статики
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(`/articles`, express.static(path.join(__dirname, PUBLIC_DIR)));

app.listen(DEFAULT_PORT);

