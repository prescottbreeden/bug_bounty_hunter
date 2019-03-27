const auth = require('../controllers/auth.controller');

module.exports = function(app) {

  app
    .post('/api/auth/email', auth.getEmail)
    .post('/api/auth/login', auth.login);
}
