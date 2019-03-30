const { MapUserData } = require('../models/mapper');
const User = require('../models/user.models');

module.exports = {

  getEmail: (req, res) => {
    const { email } = req.body;
    User.findEmail(email)
      .then(data => res.json(data))
      .catch(error => res.json(error));
  },

  login: (req, res) => {
    const { email, password } = req.body;
    User.login(email, password)
      .then(data => res.json(data))
      .catch(error => res.json(error));
  },

  updateToken: (req, res) => {
    const { user_id: ID } = req.body;
    User.updateToken(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }
};

