const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const { User } = require('../models/Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db = mysql.createConnection(config.database);
const { 
  queryValidateEmail,
  queryLogin,
  queryGetUserById  
} = require('./../dbQueries/auth.queries');

module.exports = {

  getEmail: (req, res) => {
    const {email} = req.body;
    db.query(queryValidateEmail, [email], (error, results) => {
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
    console.log('auth: login()');
    const {email, password} = req.body;
    db.query(queryLogin, [email], (error, results) => {
        if (error) {
          logger.log('warn', `auth.login(): ${error}`);
          res.json(error);
        }
        else {
          const user = new User(results[0]);
          const status = bcrypt.compareSync(password, results[0]['password']);
          if (status) {
            return res.json(createNewToken(user));
          } else {
            return res.json(null);
          }
        }
      });
  },

  updateToken: (req, res) => {
    console.log('auth: updateToken()');
    const {user_id:ID} = req.body;
    db.query(queryGetUserById, [ID], (error, results) => {
        if (error) {
          logger.log('warn', `auth.updateToken(): ${error}`);
          return res.json(error);
        } 
        const user = new User(results[0]);
        return res.json(createNewToken(user));
      }
    ) 
  }
};

function createNewToken(user) {
  console.log('auth: newToken()');
  console.log('returning user: \n\n', user, '\n\n');
  return jwt.sign({currentUser:user}, 'shhhhhhh');
}