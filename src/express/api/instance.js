"use strict";

const axios = require(`axios`);

// const { HttpMethod } = require(`../constants`);
const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultURL = `http://localhost:${port}/api/`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

}

const defaultAPI = new API(defaultURL, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI,
};
