const Answer = require('../models/answer.models')

module.exports = {

  getAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    Answer.findById(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  addAnswer: (req, res) => {
    const DATA = req.body;
    Answer.create(DATA)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  updateAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    const {answer_content:ANSWER} = req.body;
    Answer.update(ID, ANSWER)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  acceptAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    const {accepted} = req.body;
    Answer.accept(ID, accepted)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  deleteAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    Answer.deleteById(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }

};
