// controller is sending the client data to the model - controls traffic

const { pullAllTopics } = require("../models/models");

exports.getAllTopics = (req, res) => {
  console.log("I am in the controller");
  pullAllTopics()
    .then((topics) => {
      console.log("topics");
      console.log(topics);
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.log(err);
    });
};
