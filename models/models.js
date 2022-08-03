//accessing the data from nc_news

const db = require("../db/connection.js");
const articles = require("../db/data/test-data/articles.js");
const users = require("../db/data/test-data/users.js");
const checkExists = require("../models/utils");

exports.pullAllTopics = async () => {
  const result = await db.query("SELECT * FROM topics;");
  if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: "Topics not found" });
  }
  return result.rows;
};

exports.pullArticleById = async (id) => {
  const result = await db.query(
    "SELECT * FROM articles WHERE article_id =$1;",
    [id]
  );
  if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  }
  return result.rows[0];
};

exports.patchArticleUsingId = async (id, vote_number) => {
  const result = await db.query(
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
    [vote_number, id]
  );
  if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  }
  return result.rows[0];
};

exports.pullAllUsers = async () => {
  const result = await db.query("SELECT * FROM users;");
  if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: "Users not found" });
  }
  return result.rows;
};
