const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const Models = require('../models/Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {
  
  getAll: (req, res, next) => {
    db_connection.query('SELECT * FROM users', function(error, results, fields) {
      if(error) {
        logger.log('warn', `users.getAll(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getById: (req, res, next) => {
    const ID = req.params.id;
    db_connection.query('SELECT * FROM users WHERE user_id = ?', [ID] , 
      function(error, results, fields) {

      if(error) {
        logger.log('warn', 'SYS ERROR: users.getById()');
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  create: (req, res, next) => {
    const data = req.body;
    let password = data.password;

    if (password) {
      password = bcrypt.hashSync(password, 10);
    }

    db_connection.query('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [data.first_name, data.last_name, data.email, password],  
      function(error, results, fields) {

      if (error) {
        logger.log('warn', 'SYS ERROR: users.create()');
        res.json(error);
      }
      else {
        console.log('------ NEW USER CREATED ------ ');
      }
    });

    db_connection.query('SELECT * FROM users WHERE email = ?', [data.email], 
      function(error, results, fields) {

      if (error) {
        logger.log('warn', 'SYS ERROR: users.login()');
        res.json(error);
      } else {
        const user = new Models.User(results[0]);
        let token = jwt.sign({ currentUser: user }, 'shhhhhhh');
        console.log('returning user: \n\n', user,'\n\n', token);
        return res.json(token);
      }
    });
  },

  update: (req, res, next) => {
    const data = req.body;
    res.json('route not finished');
  },

  delete: (req, res, next) => {
    res.json('route not finished');
  },

};
