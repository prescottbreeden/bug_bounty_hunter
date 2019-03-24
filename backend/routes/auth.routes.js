const auth = require('../controllers/auth.controller');

module.exports = function(app) {

  app
    .post('/authservice/validate/email/', auth.validateEmail)
    .post('/authservice/authenticate', auth.login);
}
