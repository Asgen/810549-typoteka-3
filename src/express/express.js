"use strict";

const express = require(`express`);
const mainRoutes = require(`./routes/main-routes`);

const DEFAULT_PORT = 8081;

const app = express();
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT);

