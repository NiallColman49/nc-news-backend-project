// controller is sending the client data to the model - controls traffic

const {
  pullAllTopics,
  pullArticleById,
  patchArticleUsingId,
  pullAllUsers,
} = require("../models/models");

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

exports.patchArticlebyId = async (req, res, next) => {
  try {
    const article_id = req.params.article_id;
    const votes = req.body.inc_votes;
    const patcher = await patchArticleUsingId(article_id, votes);
    res.status(200).send({ article: patcher });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (rec, res, next) => {
  try {
    const users = await pullAllUsers();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};
