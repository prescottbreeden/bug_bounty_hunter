const user = require('./controllers/user.controller');
const auth = require('./controllers/auth.controller');
const bug = require('./controllers/bug.controller');

module.exports = function(app) {

  app
    .get('/api/users', user.getAll)
    .get('/api/users/:id', user.getById)
    .post('/api/users', user.create)
    .put('/api/users/:id', user.update)
    .delete('/api/users/:id', user.delete)

    .get('/api/users/stats', user.getAllUserData)
    .get('/api/users/stats/:id', user.getUserStatsById)

    .post('/authservice/validate/email/', auth.validateEmail)
    .post('/authservice/authenticate', auth.login)

    .get('/api/bugs', bug.getAll)
    .get('/api/bugs/:bug_id', bug.getById)
    .post('/api/bugs', bug.create)
    .put('/api/bugs/:bug_id', bug.update)
    .delete('/api/bugs/:bug_id', bug.delete)

    .get('/api/answers/:id', bug.getAnswer)
    .post('/api/answers', bug.addAnswer)

    .get('/api/bugs/favorites/:bug_id/:user_id', bug.isFavorite)
    .get('/api/bugs/favorites/:user_id', bug.getFavorites)
    .post('/api/bugs/favorites', bug.addFavorite)
    .delete('/api/bugs/favorites/:bug_id/:user_id', bug.removeFavorite)

}
