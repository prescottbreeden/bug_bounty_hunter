const Favorite = require('../models/favorite.models');

module.exports = {

  getFavorites: (req, res) => {
    const {user_id:ID} = req.params;
    Favorite.getAll(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  isFavorite: (req, res) => {
    const {bug_id} = req.params;
    const {user_id} = req.params;
    Favorite.isFavorite(bug_id, user_id)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  addFavorite: (req, res) => {
    const DATA = req.body;
    Favorite.create(DATA)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  removeFavorite: (req, res) => {
    const {bug_id, user_id} = req.params;
    Favorite.deleteById(bug_id, user_id)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }
};