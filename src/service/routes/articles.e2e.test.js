/* global describe, test, expect */
'use strict';

const request = require(`supertest`);
const {server} = require(`../cli/server`);

const mocks = require(`./__mocks__/mockFile.js`);
global.mockFileContent = [...mocks];

describe(`Articles API end-points`, () => {
  test(`When get articles status code should be 200`, async () => {
    const res = await request(server).get(`/articles`);
    expect(res.statusCode).toBe(200);
  });
  test(`When correct post an article status code should be 200`, async () => {
    const newArticle = {
      id: `t31O5j`,
      title: `Продам новую приставку Sony Playstation 5.`,
      announce: `Если товар не понравится — верну всё до последней копейки. Таких предложений больше нет! Мой дед не мог её сломать. Кому нужен этот новый телефон, если тут такое... Товар в отличном состоянии.`,
      fullText: `Если найдёте дешевле — сброшу цену. Кажется, что это хрупкая вещь.`,
      category: [],
      createdDate: `2022-10-20T15:47:58.814Z`,
      comments: [
        {
          id: `t2tRw`,
          text: `Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`
        }
      ]
    };
    const res = await request(server)
    .post(`/articles`)
    .send(newArticle);

    expect(res.statusCode).toBe(200);
  });
  test(`When incorrect post an article status code should be 200`, async () => {
    const res = await request(server)
    .post(`/articles`)
    .send({});

    expect(res.statusCode).toBe(400);
  });
  test(`When get article status code should be 200`, async () => {
    global.mockFileContent = [...mocks];
    console.log(`------------###########`, global.mockFileContent);
    const res = await request(server).get(`/articles/xuO5j`);
    expect(res.statusCode).toBe(200);
  });
  test(`When correct edit article status code should be 200`, async () => {
    const newArticle = {...mocks[0]};
    const res = await request(server)
    .put(`/articles/t1O5j`)
    .send(newArticle);

    expect(res.statusCode).toBe(200);
  });
  test(`When incorrect edit article status code should be 200`, async () => {
    const res = await request(server)
    .put(`/articles/uO5j`)
    .send({});

    expect(res.statusCode).toBe(400);
  });
  test(`When delete an article status code should be 200`, async () => {
    const res = await request(server).delete(`/articles/uO5j`);

    expect(res.statusCode).toBe(200);
  });
  test(`When get comments status code should be 200`, async () => {
    const res = await request(server).get(`/articles/uO5j/comments`);
    expect(res.statusCode).toBe(200);
  });
  test(`When post a comment status code should be 200`, async () => {

    const newComment = {...mocks[0].comments[0]};
    const res = await request(server)
    .post(`/articles/uO5j/comments`)
    .send(newComment);

    expect(res.statusCode).toBe(200);
  });
  test(`When post incorrect comment status code should be 400`, async () => {
    const res = await request(server)
    .post(`/articles/uO5j/comments`)
    .send({});

    expect(res.statusCode).toBe(400);
  });
  test(`When delete a comment status code should be 200`, async () => {
    const res = await request(server).delete(`/articles/uO5j/comments/StRw`);

    expect(res.statusCode).toBe(200);
  });
  test(`When delete non existent comment status code should be 404`, async () => {
    const res = await request(server).delete(`/articles/uO5j/comments/xxx`);

    expect(res.statusCode).toBe(404);
  });
});
