const user = require('./controllers/user.controller');
const auth = require('./controllers/auth.controller');
const bug = require('./controllers/bug.controller');
const answer = require('./controllers/answer.controller');

module.exports = function(app) {

  app
    .get('/api/users', user.getAll)
    .get('/api/users/:id', user.getById)
    .post('/api/users', user.create)
    .put('/api/users/:id', user.update)
    .delete('/api/users/:id', user.delete)

    .post('/authservice/validate/email/', auth.validateEmail)
    .post('/authservice/authenticate', auth.login)

    .get('/api/bugs', bug.getAll)
    .get('/api/bugs/:id', bug.getById)
    .post('/api/bugs', bug.create)
    .put('/api/bugs/:id', bug.update)
    .delete('/api/bugs/:id', bug.delete)

    .get('/api/answers', answer.getAll)
    .get('/api/answers/:id', answer.getById)
    .get('/api/answers/all/:id', answer.getAllWithId)
    .post('/api/answers', answer.create)
    .put('/api/answers/:id', answer.update)
    .delete('/api/answers/:id', answer.delete)
}
