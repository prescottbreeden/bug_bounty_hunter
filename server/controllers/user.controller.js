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
    let q = ` SELECT * FROM users; `;
    db_connection.query(q, function(error, results, fields) {
      if(error) {
        logger.log('warn', 'SYS ERROR: users.getAll()');
        next(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getById: (req, res, next) => {
    const ID = req.params.id;
    let q = `SELECT * FROM users WHERE user_id = ${ID};`;
    db_connection.query(q, function(error, results, fields) {
      if(error) {
        logger.log('warn', 'SYS ERROR: users.getById()');
        next(error);
      }
      else {
        res.json(results);
      }
    });
  },

  create: (req, res, next) => {
    const data = req.body;
    const first_name = data.first_name;
    const last_name = data.last_name;
    const email = data.email;
    let password = data.password;

    if (password) {
      password = bcrypt.hashSync(password, 10);
    }

    let q = `
      INSERT INTO 
       users (first_name, last_name, email, password) 
      VALUES ('${first_name}','${last_name}','${email}','${password}')
    ;`;

    db_connection.query(q, function(error, results, fields) {
      if (error) {
        logger.log('warn', 'SYS ERROR: users.create()');
        next(error);
      }
      else {
        console.log('------ NEW USER CREATED ------ ');
      }
    });

    q = `SELECT * FROM users WHERE email = '${email}';`;
    db_connection.query(q, function(error, results, fields) {
      if (error) {
        logger.log('warn', 'SYS ERROR: users.login()');
        next(error);
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
