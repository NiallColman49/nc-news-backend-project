//accessing the data from nc_news

const db = require("../db/connection.js");

exports.pullAllTopics = async () => {
  const result = await db.query("SELECT * FROM topics;");
  return result.rows;
};

exports.pullArticleById = async (id) => {
  const result = await db.query(
    "SELECT * FROM articles WHERE article_id =$1;",
    [id]
  );
  return result.rows;
};
