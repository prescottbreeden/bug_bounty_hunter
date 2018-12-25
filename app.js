const express = require('express');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const Routes = require('./server/routes.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public/dist/public' ));

Routes(app);
app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"));
});

app.listen(config.server.port, () => {
  console.log(`Express server listening on port: ${config.server.port}`);
});

