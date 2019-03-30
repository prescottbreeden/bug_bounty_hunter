const logger = require('../_helpers/logger');
const {database:connect} = require('../../config')['development'];
const db = require('mysql').createConnection(connect);
const {
  queryNewAnswer,
  queryGetAnswer,
  queryUpdateAnswer,
  queryAcceptAnswer,
  queryDeleteAnswer
} = require('../dbQueries/answer.queries');

module.exports = {

  addAnswer: (req, res) => {
    const DATA = req.body;
    db.query(queryNewAnswer, [DATA], (error, results) => {
      if (error) {
        logger.log('warn', `bugs.addAnswer(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    db.query(queryGetAnswer , [ID], (error, results) => {
      if (error) {
        logger.log('warn', `bugs.getAnswer(): ${error}`);
        res.json(error);
      } else {
        res.json(results);
      }
    })
  },

  updateAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    const {answer_content:answer} = req.body;
    db.query(queryUpdateAnswer , [answer, ID], (error, results) => {
      if (error) {
        logger.log('warn', `bug.update(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  acceptAnswer: (req, res) => {
    const {answer_id:ID} = req.params;
    const {accepted} = req.body;
    db.query(queryAcceptAnswer, [accepted, ID], (error, results) => {
      if (error) {
        logger.log('warn', `bug.update(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });

  },

  deleteAnswer: (req, res) => {
    console.log(queryDeleteAnswer);
  }

};