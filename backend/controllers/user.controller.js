const User = require('../models/user.models');

module.exports = {

  getAll: (req, res) => {
    User.findAll()
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  getById: (req, res) => {
    const {user_id:ID} = req.params;
    User.findById(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  getUserStatsById: (req, res) => {
    const {user_id:ID} = req.params;
    User.getStats(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  getFactionStats: (req, res) => {
    const {faction_id:ID} = req.params;
    User.getFactionStats(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  create: (req, res) => {
    const DATA = req.body;
    User.create(DATA)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  update: (req, res) => {
    const {bug_id:ID} = req.params;
    const DATA = req.body;
    User.updateById(DATA, ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  delete: (req, res) => {
    const {user_id:ID} = req.params;
    throw 'Route not implemented';
  },

  setProfilePic: (req, res) => {
    const {user_id:ID} = req.params;
    const {profile_img:IMG} = req.body;
    User.updateProfilePic(IMG, ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  setKonamiUnlock: (req, res) => {
    const {user_id:ID} = req.body;
    User.updateKonami(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }

};
