const auth = require('../controllers/auth.controller');

module.exports = app => {

  app
    .get('/api/auth/:id', auth.updateToken)
    .post('/api/auth/email', auth.getByEmail)
    .post('/api/auth/login', auth.login);
}
