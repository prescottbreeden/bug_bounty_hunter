// - - - - = = = = Dependencies = = = = - - - - 
const express = require('express');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const favicon = require('serve-favicon');
const Routes = require('./server/routes.js');
const errorHandler = require('./server/error-handler');
const app = express();



// - - - - = = = = Middleware = = = = - - - - 
app.use(session( config.session ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public/dist/public' ));

Routes(app);
app.use(errorHandler);
app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"));
});

app.listen(config.server.port, () => {
  console.log(`Express server listening on port: ${config.server.port}`);
});

