const bug = require('./../controllers/bug.controller');

module.exports = function(app) {

  app
    .get('/api/bugs', bug.getAllBugs)
    .get('/api/bugs/:bug_id', bug.getBugById)
    .post('/api/bugs', bug.createBug)
    .put('/api/bugs/:bug_id', bug.updateBug)
    .delete('/api/bugs/:bug_id', bug.deleteBug)

    .get('/api/bugs/favorites/:bug_id/:user_id', bug.isFavorite)
    .get('/api/bugs/favorites/:user_id', bug.getFavorites)
    .post('/api/bugs/favorites', bug.addFavorite)
    .delete('/api/bugs/favorites/:bug_id/:user_id', bug.removeFavorite);
}
