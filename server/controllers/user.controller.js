const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const Models = require('../models/Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {
  
  getAll: (req, res) => {
    db_connection.query(`
    
       SELECT user_id,
              faction_name,
              first_name,
              last_name,
              email,
              admin,
              profile_img,
              konami_unlock,
              user_created,
              user_updated,
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id`, 

      function(error, results, fields) {
      if(error) {
        logger.log('warn', `users.getAll(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getById: (req, res) => {
    db_connection.query(`

       SELECT * 
         FROM users AS u
         JOIN factions AS f
        WHERE user_id = ?`, 

      function(error, results, fields) {
      if(error) {
        logger.log('warn', `users.getById(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getAllUserData: (req, res) => {
    db_connection.query(`

       SELECT CONCAT(u.first_name, ' ', u.last_name) AS name,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT answer_id) AS answers,
              COUNT(DISTINCT favorite_id) AS favorites
         FROM users AS u
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS f
           ON f.user_id = u.user_id
     GROUP BY u.user_id
     ORDER BY bugs DESC`, [req.params.id], 

      function(error, results, fields) {
      if(error) {
        logger.log('warn', `users.getAllUserData(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });

  },

  getUserStatsById: (req, res) => {
    db_connection.query(`

       SELECT COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT answer_id) AS answers,
              COUNT(DISTINCT favorite_id) AS favorites,
              konami_unlock
         FROM users AS u
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS f
           ON f.user_id = u.user_id
        WHERE u.user_id = ?
     GROUP BY u.user_id`, [req.params.id], 

      function(error, results, fields) {
      if(error) {
        logger.log('warn', `users.getUserStatsById(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  create: (req, res) => {
    const DATA = req.body;
    DATA.password = bcrypt.hashSync(req.body.password, 10);
    db_connection.query(`

       INSERT 
         INTO users 
          SET ?`, [DATA], 

      function(error, results, fields) {
      if (error) {
        logger.log('warn', `users.create(): ${error}`);
        res.json(error);
      }
      else {
        return res.json(results);
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
