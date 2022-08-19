const request = require("supertest");
const app = require("../app");
const db = require("../db");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
require("jest-sorted");

afterAll(() => {
  if (db.end) {
    return db.end();
  }
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/topics", () => {
  test("status 200: responds with a status code 200 and an object containing all the topics", () => {
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

describe("GET /api/articles/:article_id", () => {
  test("status 200: responds with a single object that has the following properties: author, title, article_id, body, topic, created_at, votes and comment count", () => {
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
          comment_count: expect.any(String),
        });
      });
  });
  test("status: 400, responds with a custom error message when a bad request is passed", () => {
    return request(app)
      .get("/api/articles/1£@£$")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("This is an invalid url");
      });
  });
  test("status: 404, responds with a custom error message when passed an article ID that does not exist", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Nothing found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("status 200: indicates how much the votes property should be increased by", () => {
    const article_id = 1;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 101,
        });
      });
  });
  test("status: 400, responds with an error message when a bad request is passed", () => {
    return request(app)
      .patch(`/api/articles/!£#*`)
      .send({ inc_votes: 1 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("This is an invalid url");
      });
  });
  test("status: 404, responds with an error message when trying to patch an article ID that does not exist", () => {
    return request(app)
      .patch(`/api/articles/1111`)
      .send({ inc_votes: 1 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Nothing found");
      });
  });
});

describe("GET /api/users", () => {
  test("status 200: responds with an array of objects: Each object should have the following property username, name and avatar_url", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/:article_id (comment count)", () => {
  test("status 200: should return an article which also includes the comment_count key", () => {
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
          comment_count: expect.any(String),
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
      .get("/api/articles/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Nothing found");
      });
  });
});

describe("GET /api/articles", () => {
  test("status 200: responds with an array of article objects. Each one has the following properties: author, title, article_id, topic, created_at, votes, comment_count ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const allArticles = body;
        allArticles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
            })
          );
        });
      });
  });
  test("status 200: returned articles are sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const allArticles = body;
        expect(allArticles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("status 200: should return an array containing comment objects for given id", () => {
    return request(app)
      .get("/api/articles/5/comments")
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          expect(comment).toEqual({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });
  test("status: 400, responds with an error message when an invalid ID is passed", () => {
    return request(app)
      .get("/api/articles/incorrect/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("This is an invalid url");
      });
  });
  test("status: 404, responds with an error message when passed an article ID that does not exist", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Nothing found");
      });
  });
  test("status: 200, responds with an empty array when an article has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("status: 201, posts a new comment which accepts the keys username and body", () => {
    const newComment = { username: "lurker", body: "new comment" };
    return request(app)
      .post(`/api/articles/2/comments`)
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.newArticleComment).toEqual({
          body: "new comment",
          created_at: expect.any(String),
          votes: expect.any(Number),
          author: expect.any(String),
          article_id: expect.any(Number),
          comment_id: expect.any(Number),
        });
      });
  });
  test("status: 400, responds with an error message when comment is incorrectly formatted", () => {
    return request(app)
      .post("/api/articles/3/comments")
      .send({ yourname: "lurker", bodies: "new comment" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("This is an invalid url");
      });
  });
  test("status: 400, responds with an error message when an invalid ID is passed", () => {
    return request(app)
      .post("/api/articles/incorrect/comments")
      .send({ username: "lurker", body: "new comment" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("This is an invalid url");
      });
  });
  test("status: 404, responds with an error message when an article ID does not exist", () => {
    return request(app)
      .post("/api/articles/75/comments")
      .send({ username: "lurker", body: "new comment" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Nothing found");
      });
  });

  describe("11. GET /api/articles (queries)", () => {
    test("sorts the response by default created_at when no sort_by defined in request ", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const articles = body;
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("sorts the response by votes ", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          const articles = body;
          expect(articles).toBeSortedBy("votes", { descending: true });
        });
    });
    test("sorts the response by a articles feild and requested order ", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order_by=ASC")
        .expect(200)
        .then(({ body }) => {
          const articles = body;
          expect(articles).toBeSortedBy("title", { descending: false });
        });
    });
    test("sorts the response by a articles feild, requested order and filters by requeted topic ", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order_by=ASC&topic=cats")
        .expect(200)
        .then(({ body }) => {
          const articles = body;
          expect(articles).toBeSortedBy("title", { descending: false });
          articles.forEach((article) => {
            expect(article.topic).toEqual("cats");
          });
        });
    });
    test("returns all topics if no topics requested ", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order_by=ASC")
        .expect(200)
        .then(({ body }) => {
          const articles = body;
          expect(articles).toBeSortedBy("title", { descending: false });
          expect(articles).toHaveLength(12);
        });
    });
    test("returns error if order_by is not valid", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order_by=Aggg&topic=spaceman")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("returns error if sort_by is not valid", () => {
      return request(app)
        .get("/api/articles?sort_by=badger&order_by=ASC&topic=spaceman")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
});
