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

  getById: (req, res) => {
    db_connection.query('SELECT * FROM users WHERE user_id = ?', req.params.id, 
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

  create: (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    db_connection.query('INSERT INTO users SET ?', req.body, 
      function(error, results, fields) {

      if (error) {
        logger.log('warn', `users.create(): ${error}`);
        res.json(error);
      }
      else {
        console.log('------ NEW USER CREATED ------ ');
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
