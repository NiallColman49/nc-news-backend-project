//accessing the data from nc_news

const db = require("../db/connection.js");
const articles = require("../db/data/test-data/articles.js");
const checkExists = require("../models/utils");

exports.pullAllTopics = async () => {
  const result = await db.query("SELECT * FROM topics;");
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
