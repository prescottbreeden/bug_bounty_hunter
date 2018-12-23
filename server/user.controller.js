// - - - - = = = = Database Connection = = = = - - - - 
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);
const bcrypt = require('bcryptjs');

module.exports = {
  
  getAll: function (req, res) {

    let q = 'SELECT user_id AS id, email, created_at, updated_at FROM users;';

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        console.log(error);
      }
      else {
        console.log(results);
        res.json(results);
      }

    }) 
  },
  
  getById: function (req, res) {
    const ID = req.params.id;

    let q = `
       SELECT user_id, 
              email, 
              created_at, 
              updated_at 
         FROM users 
        WHERE user_id = ${ID};`;

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        console.log(error);
      }
      else {
        console.log(results);
        res.json(results);
      }
    });
  },

  create: (req, res) => {

    console.log(req.body);
    const data = req.body;
    const first_name = data.first_name;
    const last_name = data.last_name;
    const email = data.email;
    let password = data.password;

    if(emailExists(email))
      throw "Email already exists";

    // hash password
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
        console.log(error);
      }
      else {
        console.log('results: ', results);
        // let user = new User(results[results.length-1]);
        // console.log(user);
      }

    })
  },

  validateEmail: (req, res) => {
    const email = req.params.email;
    let q = `
        SELECT user_id, 
               email, 
               created_at, 
               updated_at 
          FROM users 
         WHERE email = '${email}';`;

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        console.log(error);
        res.json(error);
      }
      else {
        console.log(results);
        if (results.length > 0) {
          console.log('EMAIL EXISTS!')
        }
        console.log('EMAIL DOES NOT EXIST!')
        return res.json(results);
      }
    });
  },

  login: (req, res) => {
    const data = req.body;
    const email = req.body.email;
    console.log("LOGIN DATA", data);
    let hash = '';

    let q = `
        SELECT password
          FROM users 
         WHERE email = '${email}';`;

    db_connection.query(q, function(error, results, fields) {
      if(error) {
        console.log(error);
        res.json(error);
      }
      else {
        
        var status = bcrypt.compareSync(data.password, results[0]['password']);
        console.log(status);

        if (status) {
          console.log('hash check success')
        }
        console.log('hash check fail')
        return res.json(results)
      }
    });
    
  }

};
