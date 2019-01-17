const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const Models = require('../models/Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {

  validateEmail: (req, res) => {
    db_connection.query(`

      SELECT * FROM users WHERE email = ?`, req.body.email, 
      
      function(error, results, fields) {
      if(error) {
        logger.log('warn', `users.validateEmail(): ${error}`);
        res.json(error);
      }
      else {
        return res.json(results);
      }
    });
  },

  login: (req, res) => {
    const EMAIL = req.body.email;
    db_connection.query(`

       SELECT user_id,
              faction_name,
              first_name,
              last_name,
              email,
              password, 
              admin,
              profile_img,
              konami_unlock,
              user_created,
              user_updated
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id
        WHERE email = ?`, [EMAIL], 
        
      function(error, results, fields) {
      if(error) {
        logger.log('warn', `users.login(): ${error}`);
        res.json(error);
      }
      else {
        const user = new Models.User(results[0]);
        var status = bcrypt.compareSync(req.body.password, results[0]['password']);
        if (status) {
          let token = jwt.sign({ currentUser: user }, 'shhhhhhh');
          console.log('returning user: \n\n', user,'\n\n', token);

          return res.json(token);
        }
        else {
          return res.json(null);
        }
      }
    });
  }
};
