const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {
  
  getAll: (req, res) => {
    db_connection.query('SELECT * FROM bugs', function(error, results, fields) {
      if(error) {
        logger.log('warn', `bug.getAll(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getById: (req, res) => {
    db_connection.query('SELECT b.bug_id, b.posted_by, b.title, b.traceback, b.created_at AS bug_created, b.updated_at AS bug_updated, a.answer_id, a.answered_by, a.content AS answer_content, a.created_at AS answer_created, a.updated_at AS answer_updated FROM bugs AS b JOIN answers AS a ON b.bug_id = a.bug_id WHERE b.bug_id = ?', [req.params.id],
      function(error, results, fields) {

      if(error) {
        logger.log('warn', `bug.getById(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getByIdWithAnswers: (req, res) => {
    db_connection.query('SELECT b.bug_id, b.posted_by, b.title, b.traceback, b.created_at, b.updated_at, a.answer_id, a.content, a.created_at, a.updated_at FROM bugs AS b JOIN answers AS a ON b.bug_id = a.bug_id WHERE b.bug_id = ?', [req.params.id],
    function(error, results, fields) {
      if (error) {
        logger.log('warn', `bug.getByIdWithComments(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    })
  },

  create: (req, res) => {
    db_connection.query('INSERT INTO bugs SET ?', req.body, function(error, results, fields) {
      if (error) {
        logger.log('warn', `bug.create(): ${error}`);
        res.json(error);
      }
      else {
        console.log('------ NEW BUG CREATED ------ ');
        res.json(results);
      }
    });
  },

  update: (req, res) => {
    const data = req.body;
    res.json('route not finished');
  },

  delete: (req, res) => {
    res.json('route not finished');
  },

  addAnswer: (req, res) => {
    db_connection.query('INSERT INTO answers SET ?', req.body, function(error, results, fields) {
      if (error) {
        logger.log('warn', `bugs.addAnswer(): ${error}`);
        res.json(error);
      }
      else {
        console.log('------ NEW ANSWER CREATED ------ ');
        res.json(results);
      }
    });
  },

};
