const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const express = require('express');
const bp = require('body-parser');
const port = config.server.port;
const app = express();

app.use(bp.json());
app.use(express.static( __dirname + '/public/dist/public' ));
app.listen(port, () => console.log(`Listening on port: ${port}`));
require('./backend/routes/auth.routes')(app);
require('./backend/routes/user.routes')(app);
require('./backend/routes/bug.routes')(app);
require('./backend/routes/answer.routes')(app);
require('./backend/routes/angular.routes')(app);
