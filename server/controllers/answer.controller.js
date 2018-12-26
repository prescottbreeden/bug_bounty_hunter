const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {
  
  getAll: (req, res) => {
    db_connection.query('SELECT * FROM answers', function(error, results, fields) {
      if(error) {
        logger.log('warn', `answer.getAll(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },
  
  getById: (req, res) => {
    db_connection.query('SELECT * FROM answers WHERE answer_id = ?', [req.params.id], 
      function(error, results, fields) {

      if(error) {
        logger.log('warn', `answer.getById(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
        console.log('---------')
        console.log(results);
        console.log('---------')
      }
    });
  },

  create: (req, res) => {
    db_connection.query('INSERT INTO answers SET ?', req.body, function(error, results, fields) {
      if (error) {
        logger.log('warn', `answer.create(): ${error}`);
        res.json(error);
      }
      else {
        console.log('------ NEW ANSWER CREATED ------ ');
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

};
