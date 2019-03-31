const User = require('../models/auth.models');

module.exports = {

  getByEmail: (req, res) => {
    const { email } = req.body;
    User.findByEmail(email)
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
    const { id: ID } = req.params;
    User.updateTokenById(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }

};
