const path = require('path');
const user = require('../controllers/user.controller');
const auth = require('../controllers/auth.controller');
const bug = require('../controllers/bug.controller');

module.exports = function(app) {

  app
    .get('/api/users', user.getAll)
    .get('/api/users/:user_id', user.getById)
    .post('/api/users', user.create)
    .put('/api/users/:user_id', user.update)
    .delete('/api/users/:user_id', user.delete)
    .get('/api/users/stats', user.getAllUserData)
    .get('/api/users/stats/:user_id', user.getUserStatsById)
    .put('/api/users/profile/:user_id', user.setProfilePic)
    .get('/api/factions/:faction_id', user.getFactionStats)
}
