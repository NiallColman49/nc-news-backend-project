//getting data from nc_news

const db = require("../db/connection.js");

exports.pullAllTopics = () => {
  return db.query("SELECT * FROM topics;").then((topics) => {
    return topics.rows;
  });
};
