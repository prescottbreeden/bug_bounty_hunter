const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const logger = require('./_helpers/logger');
const db_connection = mysql.createConnection(config.database);

module.exports = {
  
  getAll: function (req, res, next) {

    let q = `
       SELECT user_id, 
              email,
              created_at,
              updated_at
         FROM users;
    `;

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        logger.log('warn', 'SYS ERROR: users.getAll()');
        next(error);
      }
      else {
        res.json(results);
      }

    }) 
  },
  
  getById: function (req, res, next) {
    const ID = req.params.id;

    let q = `
       SELECT *
         FROM users 
        WHERE user_id = ${ID};`;

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        logger.log('warn', 'SYS ERROR: users.getById()');
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
        res.json(results);
      }

    })
  },

  validateEmail: (req, res) => {
    const email = req.params.email;
    let q = `
        SELECT *
          FROM users 
         WHERE email = '${email}';`;

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        logger.log('warn', 'SYS ERROR: users.validateEmail()');
        next(error);
      }
      else {
        return res.json(results);
      }
    });
  },

  login: (req, res) => {
    const data = req.body;
    const email = req.body.email;

    let q = `
        SELECT *
          FROM users 
         WHERE email = '${email}';`;

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        logger.log('warn', 'SYS ERROR: users.login()');
        next(error);
      }
      if (results.length === 0) {
        console.log('------ EMAIL NOT FOUND ------ ');
        error.name = 'EmailNotFound';
        next(error);
      }
      else {
        const user = new User(results[0]);
        var status = bcrypt.compareSync(data.password, results[0]['password']);
        console.log('returning user: ', user);
        return res.json(results)
      }
    });
    
  }

};
