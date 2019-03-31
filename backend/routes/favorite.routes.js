const favorite = require('../controllers/favorite.controller');

module.exports = app => {

  app
    .get('/api/favorites/:bug_id/:user_id', favorite.isFavorite)
    .get('/api/favorites/:user_id', favorite.getFavorites)
    .post('/api/favorites', favorite.addFavorite)
    .delete('/api/favorites/:bug_id/:user_id', favorite.removeFavorite);

};
