const express = require("express");
const app = express();

const {
  getAllTopics,
  getArticleById,
  patchArticlebyId,
  getAllUsers,
  getAllArticles,
  getArticleComment,
} = require("./controllers/controller");

app.use(express.json());

//topics
app.get("/api/topics", getAllTopics);

//articles
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticlebyId);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getArticleComment);

//users
app.get("/api/users", getAllUsers);

//error handling
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "This is an invalid url" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

module.exports = app;
