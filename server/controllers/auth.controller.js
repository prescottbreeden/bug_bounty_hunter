const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
const logger = require('../_helpers/logger');
const Models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

module.exports = {

  validateEmail: (req, res) => {
    const email = req.body.email;
    console.log("-------------")
    console.log(email)
    console.log("-------------")

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
      else {
        const user = new Models.User(results[0]);
        var status = bcrypt.compareSync(data.password, results[0]['password']);
        if (status) {
          let token = jwt.sign({ currentUser: user }, 'shhhhhhh');
          console.log('returning user: \n\n', user,'\n\n', token);

          return res.json(token);
        }
      }
    });
  }
};
