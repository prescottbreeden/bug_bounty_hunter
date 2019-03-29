const auth = require('../controllers/auth.controller');

module.exports = app => {

  app
    .post('/api/auth/id', auth.updateToken)
    .post('/api/auth/email', auth.getEmail)
    .post('/api/auth/login', auth.login);
}
