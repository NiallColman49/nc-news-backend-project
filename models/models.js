const db = require("../db/connection.js");
const { checkExists } = require("./utils");

exports.pullAllTopics = async () => {
  const result = await db.query("SELECT * FROM topics;");
  if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: "Topics not found" });
  }
  return result.rows;
};

exports.pullArticleById = async (id) => {
  const result = await db.query(
    `SELECT articles.article_id, articles.author, title, articles.body, topic, articles.created_at, articles.votes, COUNT(comment_id) AS comment_count 
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id 
    WHERE articles.article_id = $1
    GROUP BY articles.article_id`,
    [id]
  );
  if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: "Nothing found" });
  }
  return result.rows[0];
};

exports.patchArticleUsingId = async (id, vote_number) => {
  const result = await db.query(
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
    [vote_number, id]
  );
  if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: "Nothing found" });
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

exports.pullAllArticles = async () => {
  const result =
    await db.query(`SELECT articles.article_id, articles.author, title, articles.body, topic, articles.created_at, articles.votes, COUNT(comment_id) AS comment_count 
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id 
    GROUP BY articles.article_id
    ORDER BY created_at DESC`);
  if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: "Users not found" });
  }
  return result.rows;
};

exports.getArticleComments = async (id) => {
  await checkExists("articles", "article_id", id);

  const result = await db.query(
    `SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id= $1`,
    [id]
  );
  return result.rows;
};

exports.postArticleComment = async (comment, id) => {
  await checkExists("articles", "article_id", id);

  const { username, body } = comment;
  const result = await db.query(
    `INSERT INTO comments 
    (author, body, article_id) 
    VALUES 
    ($1, $2, $3) 
    RETURNING *;`,
    [username, body, id]
  );
  if (!result.rows.length) {
    return Promise.reject({
      status: 404,
      msg: "No comments found to be added",
    });
  }
  return result.rows[0];
};
