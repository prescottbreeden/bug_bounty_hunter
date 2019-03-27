const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const { User } = require('../models/Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);
const { 
  validateEmailString,
  login,
} = require('./../dbQueries/auth.queries');

module.exports = {

  getEmail: (req, res) => {
    const { EMAIL } = req.body;
    db_connection.query(validateEmailString, EMAIL, (error, results) => {
        if (error) {
          logger.log('warn', `users.validateEmail(): ${error}`);
          res.json(error);
        }
        else {
          return res.json(results);
        }
      });
  },

  login: (req, res) => {
    const { EMAIL } = req.body;
    db_connection.query(login, [EMAIL], (error, results) => {
        if (error) {
          logger.log('warn', `users.login(): ${error}`);
          res.json(error);
        }
        else {
          const user = new User(results[0]);
          const status = bcrypt.compareSync(req.body.password, results[0]['password']);
          if (status) {
            let token = jwt.sign({ currentUser: user }, 'shhhhhhh');
            console.log('returning user: \n\n', user, '\n\n', token);
            return res.json(token);
          }
          else {
            return res.json(null);
          }
        }
      });
  },

  updateToken: (req, res) => {
    const { user_id } = req.body;
  }
};
