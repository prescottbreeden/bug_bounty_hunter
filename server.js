// - - - - = = = = Dependencies = = = = - - - - 
const express = require('express');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const favicon = require('serve-favicon');
const Schema = require('./models/Schema');
const User = require('./models/user');
const app = express();

// - - - - = = = = Database Connection = = = = - - - - 
const db_connection = mysql.createConnection(config.database);
Schema.migrate(new User);

// - - - - = = = = Controllers = = = = - - - - 
const controller = {
  
  getAll: (request, response) => {
    let q = 'SELECT user_id AS id, email, created_at, updated_at FROM users;';
    db_connection.query(q, function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        // ORM
        // let user = new User(results[results.length-1]);
        let user = new User(results[0]);
      }
    });
  },

  createUser: (request, response) => {
    let q = `INSERT INTO users (email) VALUES ('${request.body.email}');`;
    db_connection.query(q, function (error, results, fields) {
      if (error) {
        console.log(error);
      }

    });
    response.redirect('/');
  },
  towel: (request, response) => { response.render('towel') }
};

// - - - - = = = = Middleware = = = = - - - - 
app.use(session( config.session ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public/dist/public' ));


// - - - - = = = = Routes = = = = - - - - 
app 
  .get('/api/users', controller.getAll)
  .post('/api/user', controller.createUser)

app.all("*", (req, res) => {
  res.sendFile(path.resolve('./public/dist/public/index.html'));
})

app.listen(config.server.port, () => {
  console.log(`Express server listening on port ${config.server.port}`);
});

// .get('/api/user', userController.index)
// .post('/api/user', userController.create)
// .get('/api/user/:id', userController.getOne)
// .put('/api/user/:id', userController.edit)
// .delete('/api/user/:id', userController.delete)
