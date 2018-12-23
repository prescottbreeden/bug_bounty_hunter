const userController = require('./user.controller');

module.exports = function(app) {

  app
    .get('/api/users', userController.getAll)
    .get('/api/users/:id', userController.getById)
    .post('/api/users', userController.create)
    .get('/validate/email/:email', userController.validateEmail)
    .post('/login', userController.login)

    // .put('/api/users/:id', userController.update)
    // .delete('/api/users/:id', userController.delete)
    // .post('/authenticate', userController.authenticate)
}
