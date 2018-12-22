// - - - - = = = = Database Connection = = = = - - - - 
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);

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

    // if (await findByEmail({ username: userParam.username })) {
    //   throw 'Username "' + userParam.username + '" is already taken';
    // }

    const data = req.body;
    const first_name = data.first_name;
    const lat_name = data.last_name;
    const email = data.email;
    const password = data.password;

    // hash password
    if (password) {
      const hash = bcrypt.hashSync(userParam.password, 10);
    }

    let q = `
      INSERT INTO 
       users (first_name, last_name, email, password) 
      VALUES ('${first_name}','${last_name}','${email}','${hash}')
    ;`;
    db_connection.query(q)
      .then(() => {
        console.log('success');
        res.json()
      })
      .catch(err => res.json(err));

 

  },
  towel: (request, response) => { response.render('towel') }
};
