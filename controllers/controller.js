const {
  pullAllTopics,
  pullArticleById,
  patchArticleUsingId,
  pullAllUsers,
  pullAllArticles,
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
    const patchArticle = await patchArticleUsingId(article_id, votes);
    res.status(200).send({ article: patchArticle });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await pullAllUsers();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const allArticles = await pullAllArticles();
    res.status(200).send({ allArticles });
  } catch (err) {
    next(err);
  }
};
