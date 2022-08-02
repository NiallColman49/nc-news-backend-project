const request = require("supertest");
const app = require("../app");
const db = require("../db");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

afterAll(() => {
  if (db.end) {
    return db.end();
  }
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/items", () => {
  test("responds with a status code 200 and an object containing all the topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toBeInstanceOf(Array);
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe.only("GET /api/articles/:article_id", () => {
  test("Responds with a single object, which should have the following properties: author, title, article_id, body, topic, created_at and votes", () => {
    const article_id = 3;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          author: "icellusedkars",
          title: "Eight pug gifs that remind me of mitch",
          article_id: article_id,
          body: "some gifs",
          topic: "mitch",
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
      });
  });
  test("status: 400, responds with an error message when a bad request is passed", () => {
    return request(app)
      .get("/api/articles/1£@£$")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("This is an invalid url");
      });
  });
  test("status: 404, responds with an error message when passed an article ID that does not exist", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
});
