const express = require("express");
const app = express();

const {
  getAllTopics,
  getArticleById,
  patchArticlebyId,
  getAllUsers,
  getArticleComment,
  postComment,
  getQuery,
} = require("./controllers/controller");

app.use(express.json());

//topics
app.get("/api/topics", getAllTopics);

//articles
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticlebyId);
app.get("/api/articles/:article_id/comments", getArticleComment);
app.post("/api/articles/:article_id/comments", postComment);
app.get("/api/articles", getQuery);

//users
app.get("/api/users", getAllUsers);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "not found" });
});

//error handling

app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "This is an invalid url" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  console.log("unhandled error");
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
