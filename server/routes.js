const userController = require('./user.controller');

module.exports = function(app) {

  app
    .get('/api/users', userController.getAll)
    .get('/api/users/:id', userController.getById)
    .post('/api/users', userController.create)
    .put('/api/users/:id', userController.update)
    .delete('/api/users/:id', userController.delete)

    .post('/authservice/validate/email/', userController.validateEmail)
    .post('/authservice/authenticate', userController.login)
}
