const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {

  addAnswer: (req, res) => {
    const DATA = req.body;
    db_connection.query(`
    
       INSERT 
         INTO answers 
          SET ?`, [DATA], 

      function(error, results, fields) {
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
    const ID = req.params.id;
    db_connection.query(`
    
       SELECT * 
         FROM answers 
        WHERE answer_id = ?`, [ID],

      function(error, results, fields) {
      if (error) {
        logger.log('warn', `bugs.getAnswer(): ${error}`);
        res.json(error);
      } else {
        res.json(results);
      }
    })
  },

  updateAnswer: (req, res) => {
    const ID = req.params.answer_id;
    const { answer_content } = req.body;
    db_connection.query(`
    
       UPDATE answers
          SET answer_content = ?
        WHERE answer_id = ?`, [answer_content, ID], 

      function(error, results, fields) {
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
    const answer_id = req.params.answer_id;
    const accepted = req.body.accepted;
    db_connection.query(`
    
       UPDATE answers
          SET accepted = ?
        WHERE answer_id = ?`, [accepted, answer_id], 

      function(error, results, fields) {
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
    console.log('route not finished');
  }

};