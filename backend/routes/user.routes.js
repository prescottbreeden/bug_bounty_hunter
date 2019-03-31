const user = require('../controllers/user.controller');

module.exports = app => {
  app
    .get('/api/users', user.getAll)
    .get('/api/users/:user_id', user.getById)
    .post('/api/users', user.create)
    .put('/api/users/:user_id', user.update)
    .delete('/api/users/:user_id', user.delete)
    .get('/api/users/stats', user.getAllUserData)
    .put('/api/users/profile/:user_id', user.setProfilePic)
    .get('/api/factions/:faction_id', user.getFactionStats)
    .post('/api/users/konami-unlock', user.setKonamiUnlock);
};
