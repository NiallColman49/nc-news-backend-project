const express = require("express");
const app = express();

const {
  getAllTopics,
  getArticleById,
  patchArticlebyId,
  getAllUsers,
} = require("./controllers/controller");

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticlebyId);

app.get("/api/users", getAllUsers);

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
