// controller is sending the client data to the model - controls traffic

const { pullAllTopics } = require("../models/models");

exports.getAllTopics = (req, res) => {
  pullAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      return (err);
    });
};
