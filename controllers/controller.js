const {
  pullAllTopics,
  pullArticleById,
  patchArticleUsingId,
  pullAllUsers,
  pullAllArticles,
  getArticleComments,
  postArticleComment,
  selectQuery,
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

exports.getArticleComment = async (req, res, next) => {
  try {
    const id = req.params.article_id;
    const articleComments = await getArticleComments(id);
    res.status(200).send({ comments: articleComments });
  } catch (err) {
    next(err);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const id = req.params.article_id;
    const articleComment = req.body;
    const newArticleComment = await postArticleComment(articleComment, id);
    res.status(201).send({ newArticleComment });
  } catch (err) {
    next(err);
  }
};

exports.getQuery = (req, res, next) => {
  const { sort_by } = req.query;
  const { order_by } = req.query;
  const { topic } = req.query;
  selectQuery(sort_by, order_by, topic)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
};

exports.getApi = (req, res) => {
  res.status(200).send(endpoints);
};
