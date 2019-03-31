const Bug = require('../models/bug.models');

module.exports = {

  getAllBugs: (req, res) => {
    Bug.getAll()
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  getBugById: (req, res) => {
    const {bug_id:ID} = req.params;
    Bug.findById(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  createBug: (req, res) => {
    const DATA = req.body;
    Bug.create(DATA)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  updateBug: (req, res) => {
    const {bug_id:ID} = req.params;
    const DATA = req.body;
    Bug.updateById(ID, DATA)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },

  deleteBug: (req, res) => {
    const {bug_id:ID} = req.params;
    Bug.deleteById(ID)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }

}