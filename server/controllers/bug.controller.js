const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {
  
  getAll: (req, res, next) => {

    let q = 'SELECT *, FROM bugs;';

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        logger.log('warn', 'SYS ERROR: bug.getAll()');
        next(error);
      }
      else {
        res.json(results);
      }

    }) 
  },
  
  getById: (req, res, next) => {
    const ID = req.params.id;

    let q = `
       SELECT *
         FROM bugs 
        WHERE bug_id = ${ID};`;

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        logger.log('warn', 'SYS ERROR: bug.getById()');
        next(error);
      }
      if(results.length === 0) {
        console.log('------ ID NOT FOUND ------ ');
        error.name = 'IdNotFound';
        next(error);
      }
      else {
        res.json(results);
      }
    });
  },

  create: (req, res, next) => {
    const data = req.body;
    console.log(data);
    const user_id = data.user_id;
    const title = data.title;
    const traceback = data.traceback;

    let q = `
      INSERT INTO 
        bugs (user_id, title, traceback) 
      VALUES ('${user_id}','${title}','${traceback}')
    ;`;

    db_connection.query(q, function(error, results, fields) {
      if (error) {
        logger.log('warn', 'SYS ERROR: bug.create()');
        next(error);
      }
      else {
        console.log('------ NEW BUG CREATED ------ ');
        res.json(results);
      }

    })
  },

  update: (req, res, next) => {
    const data = req.body;
    res.json('route not finished');
  },

  delete: (req, res, next) => {
    res.json('route not finished');
  },

};
