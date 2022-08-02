const express = require("express");
const app = express();

const { getAllTopics, getArticleById } = require("./controllers/controller");

app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api/articles/:article_id", getArticleById);

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
