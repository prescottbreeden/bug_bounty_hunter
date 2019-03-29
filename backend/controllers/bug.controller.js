const logger = require('../_helpers/logger');
const {database:connect} = require('../../config')['development'];
const db = require('mysql').createConnection(connect);
const {
  queryAllBugs, 
  queryBugById,
  queryNewBug,
  queryUpdateBug,
  queryDeleteBug,
  queryGetFavorite,
  queryNewFavorite,
  queryGetAllFavorites,
  queryDeleteFavorite,
  queryIncrementCounter
} = require('../dbQueries/bug.queries');

module.exports = {
  
  getAllBugs: (req, res) => {
    db.query(queryAllBugs, (error, results) => {
      if(error) {
        logger.log('warn', `bug.getAll(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getBugById: (req, res) => {
    const {bug_id:ID} = req.params;
    incrementCounter(ID);
    db.query(queryBugById, [ID], (error, results) => {
      if(error) {
        logger.log('warn', `bug.getById(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  createBug: (req, res) => {
    const DATA = req.body;
    db.query(queryNewBug, [DATA], (error, results) => {
      if (error) {
        logger.log('warn', `bug.create(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  updateBug: (req, res) => {
    const {bug_id:ID} = req.params;
    const { error, traceback, message } = req.body;
    db.query(queryUpdateBug, [error, traceback, message, ID], (error, results) => {
      if (error) {
        logger.log('warn', `bug.update(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  deleteBug: (req, res) => {
    const {bug_id:ID} = req.params;
    db.query(queryDeleteBug, [ID, ID, ID], (error, results) => {
      if(error) {
        logger.log('warn', `bug.deleteBug(): ${error}`);
        res.json(error);
      }
      else {
        deleteBugData(ID);
        res.json(results);
      }
    });
  },

  isFavorite: (req, res) => {
    const {bug_id} = req.params;
    const {user_id} = req.params;
    db.query(queryGetFavorite, [bug_id, user_id], (error, results) => {
      if(error) {
        logger.log('warn', `bug.isFavorite(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  addFavorite: (req, res) => {
    const DATA = req.body;
    db.query(queryNewFavorite, [DATA], (error, results) => {
      if(error) {
        logger.log('warn', `bug.addFavorite(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  getFavorites: (req, res) => {
    const {user_id:ID} = req.params;
    db.query(queryGetAllFavorites, [ID], (error, results) => {
      if(error) {
        logger.log('warn', `bug.addFavorite(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  },

  removeFavorite: (req, res) => {
    const {bug_id, user_id} = req.params;
    db.query(queryDeleteFavorite, [bug_id, user_id], (error, results) => {
      if(error) {
        logger.log('warn', `bug.removeFavorite(): ${error}`);
        res.json(error);
      }
      else {
        res.json(results);
      }
    });
  }
};

function incrementCounter(bugId) {
    db.query(queryIncrementCounter, bugId, (error) => {
      if (error) {
        logger.log('warn', `bugs.addAnswer(): ${error}`);
      }
    });
}

function deleteBugData(bugId) {
  db.query(`DELETE FROM bugs WHERE bug_id = ?`, bugId, (error) => {
    if(error) {
      logger.log('warn', `bug.deleteBug(): ${error}`);
    }
  });
}