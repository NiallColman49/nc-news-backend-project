//getting data from nc_news

const db = require("../db/connection.js");

exports.pullAllTopics = () => {
  console.log("I am in the model");
  return db.query("SELECT * FROM topics;").then((topics) => {
    return topics.rows;
  });
};
