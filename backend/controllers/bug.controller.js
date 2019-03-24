const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {
  
  getAllBugs: (req, res) => {
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

  getBugById: (req, res) => {
    const ID = req.params.bug_id;
    incrementCounter(ID);
    db_connection.query(`
    
       SELECT b.bug_id, 
              posted_by,
              CONCAT(u.first_name, ' ', u.last_name) AS posted_name, 
              u.profile_img AS posted_profile,
              error, 
              traceback, 
              message, 
              view_count,
              bug_created, 
              bug_updated, 
              answer_id,
              CONCAT(u2.first_name, ' ', u2.last_name) AS answered_name,
              answered_by,
              u2.profile_img AS answer_profile,
              answer_content,
              accepted,
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
     ORDER BY a.accepted DESC, a.answer_created`, [ID], 
   
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

  createBug: (req, res) => {
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

  updateBug: (req, res) => {
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

  deleteBug: (req, res) => {
    const bug_id = req.params.bug_id;

    db_connection.query(`
    
       DELETE
         FROM answers
        WHERE bug_id = ?;

       DELETE
         FROM favorites
        WHERE bug_id = ?;
        
       DELETE
         FROM bugs
        WHERE bug_id = ?`, [bug_id, bug_id, bug_id], 
   
      function(error, results, fields) {
      if(error) {
        logger.log('warn', `bug.deleteBug(): ${error}`);
        res.json(error);
      }
      else {
        deleteBugData(bug_id);
        res.json(results);
      }
    });
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

  }

};

function incrementCounter(bugId) {
    db_connection.query(`

       UPDATE bugs 
          SET view_count = view_count + 1 
        WHERE bug_id = ?`, bugId, 

      function(error) {
      if (error) {
        logger.log('warn', `bugs.addAnswer(): ${error}`);
      }
    });
}

function deleteBugData(bugId) {
  db_connection.query(`
  
      DELETE
        FROM bugs
      WHERE bug_id = ?`, bugId, 
  
    function(error) {
    if(error) {
      logger.log('warn', `bug.deleteBug(): ${error}`);
    }
  });
}