'use strict';

const request = require(`supertest`);
const server = require(`../test/server`);

describe(`Books API end-points`, () => {
  test(`When get articles status code should be 200`, async () => {
    const res = await request(server).get(`/articles`);
    expect(res.statusCode).toBe(200);
  });
});
