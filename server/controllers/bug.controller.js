const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {
  
  getAll: (req, res) => {
    db_connection.query(`

       SELECT b.bug_id, 
              posted_by,
              CONCAT(u.first_name, ' ', u.last_name) AS posted_name, 
              error, 
              traceback, 
              message, 
              view_count,
              bug_created, 
              COUNT(a.bug_id) AS num_answers
         FROM bugs AS b 
    LEFT JOIN answers AS a 
           ON b.bug_id = a.bug_id 
    LEFT JOIN users AS u
           ON b.posted_by = u.user_id
     GROUP BY b.bug_id
     ORDER BY b.bug_created DESC`, 

      function(error, results, fields) {
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
    const ID = req.params.bug_id;
    incrementCounter(ID);
    db_connection.query(`
    
       SELECT b.bug_id, 
              posted_by,
              CONCAT(u.first_name, ' ', u.last_name) AS posted_name, 
              error, 
              traceback, 
              message, 
              view_count,
              bug_created, 
              bug_updated, 
              answer_id,
              CONCAT(u2.first_name, ' ', u2.last_name) AS answered_name,
              answered_by,
              answer_content,
              answer_created,
              answer_updated
         FROM bugs AS b 
    LEFT JOIN answers AS a 
           ON b.bug_id = a.bug_id 
    LEFT JOIN users AS u 
           ON b.posted_by = u.user_id 
    LEFT JOIN users AS u2
           ON a.answered_by = u2.user_id
        WHERE b.bug_id = ?
     ORDER BY a.answer_created`, [ID], 
   
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
    const DATA = req.body;
    db_connection.query(`
    
       INSERT 
         INTO bugs 
          SET ?`, [DATA], 

      function(error, results, fields) {
      if (error) {
        logger.log('warn', `bug.create(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  update: (req, res) => {
    const ID = req.params.bug_id;
    const { error, traceback, message } = req.body;
    db_connection.query(`
    
       UPDATE bugs
          SET error = ?,
              traceback = ?,
              message = ?
        WHERE bug_id = ?`, [error, traceback, message, ID], 

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

  delete: (req, res) => {
    res.json('route not finished');
  },

  isFavorite: (req, res) => {
    const BUG_ID = req.params.bug_id;
    const USER_ID = req.params.user_id;
    db_connection.query(`
    
       SELECT f.user_id
         FROM bugs AS b 
         JOIN favorites AS f 
           ON b.bug_id = f.bug_id 
        WHERE b.bug_id = ?
          AND f.user_id = ?`, [BUG_ID, USER_ID], 
   
      function(error, results, fields) {
      if(error) {
        logger.log('warn', `bug.isFavorite(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  addFavorite: (req, res) => {
    const DATA = req.body;
    db_connection.query(`
    
       INSERT 
         INTO favorites
          SET ?`, [DATA], 
   
      function(error, results, fields) {
      if(error) {
        logger.log('warn', `bug.addFavorite(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getFavorites: (req, res) => {
    const ID = req.params.user_id;
    db_connection.query(`
    
       SELECT b.bug_id,
              posted_by,
              CONCAT(u.first_name, ' ', u.last_name) AS posted_name, 
              error, 
              traceback, 
              message, 
              view_count,
              bug_created, 
              COUNT(a.bug_id) AS num_answers
         FROM bugs AS b 
    LEFT JOIN answers AS a 
           ON b.bug_id = a.bug_id 
    LEFT JOIN users AS u
           ON b.posted_by = u.user_id
         JOIN favorites AS f
           ON b.bug_id = f.bug_id
        WHERE f.user_id = ?
     GROUP BY b.bug_id
     ORDER BY b.bug_created DESC`, [ID], 
   
      function(error, results, fields) {
      if(error) {
        logger.log('warn', `bug.addFavorite(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });

  },

  removeFavorite: (req, res) => {
    db_connection.query(`
    
     DELETE 
       FROM favorites
      WHERE bug_id = ? 
        AND user_id = ?`, [req.params.bug_id, req.params.user_id], 
   
      function(error, results, fields) {
      if(error) {
        logger.log('warn', `bug.removeFavorite(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });

  },

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

  deleteAnswer: (req, res) => {
    console.log('route not finished');
  }

};

function incrementCounter(bugId) {

    db_connection.query(`

       UPDATE bugs 
          SET view_count = view_count + 1 
        WHERE bug_id = ?`, bugId, 

      function(error, results, fields) {
      if (error) {
        logger.log('warn', `bugs.addAnswer(): ${error}`);
      }
    });
}
