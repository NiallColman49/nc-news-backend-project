// controller is sending the client data to the model - controls traffic

const { pullAllTopics, pullArticleById } = require("../models/models");

exports.getAllTopics = async (req, res, next) => {
  try {
    const topics = await pullAllTopics();
    res.status(200).send({ topics });
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const id = req.params.article_id;
    const pullArticle = await pullArticleById(id);
    res.status(200).send({ article: pullArticle });
  } catch (err) {
    next(err);
  }
};
