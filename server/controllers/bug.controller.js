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
    db_connection.query('SELECT * FROM bugs WHERE bug_id = ?', [req.params.id], 
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

};
