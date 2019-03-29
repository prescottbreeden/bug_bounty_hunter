const logger = require('../_helpers/logger');
const bcrypt = require('bcryptjs');
const {database:connect} = require('../../config')['development'];
const db = require('mysql').createConnection(connect);
const {
  queryAllUsers,
  queryUserById,
  queryUserData,
  queryUserStatsById,
  queryFactionStats,
  queryNewUser,
  queryUpdateUser,
  queryUpdateProfilePic
} = require('../dbQueries/user.queries');

module.exports = {
  
  getAll: (req, res) => {
    db.query(queryAllUsers, (error, results) => {
      if(error) {
        logger.log('warn', `users.getAll(): ${error}`);
        res.json(error);
      } else {
        res.json(results);
      }
    });
  },

  getById: (req, res) => {
    const {user_id:ID} = req.params;
    db.query(queryUserById, [ID], (error, results) => {
      if(error) {
        logger.log('warn', `users.getById(): ${error}`);
        res.json(error);
      } else {
        res.json(results);
      }
    });
  },

  getAllUserData: (req, res) => {
    const {user_id:ID} = req.params;
    db.query(queryUserData, [ID], (error, results) => {
      if(error) {
        logger.log('warn', `users.getAllUserData(): ${error}`);
        res.json(error);
      } else {
        res.json(results);
      }
    });
  },

  getUserStatsById: (req, res) => {
    const {user_id:ID} = req.params;
    db.query(queryUserStatsById, [ID], (error, results) => {
      if(error) {
        logger.log('warn', `users.getUserStatsById(): ${error}`);
        res.json(error);
      } else {
        res.json(results);
      }
    });
  },

  getFactionStats: (req, res) => {
    const {faction_id:ID} = req.params;
    db.query(queryFactionStats, [ID], (error, results) => {
      if(error) {
        logger.log('warn', `users.getFactionStats(): ${error}`);
        res.json(error);
      } else {
        res.json(results);
      }
    });
  },

  create: (req, res) => {
    const DATA = req.body;
    DATA.password = bcrypt.hashSync(req.body.password, 10);
    db.query(queryNewUser, [DATA], (error, results) => {
      if (error) {
        logger.log('warn', `users.create(): ${error}`);
        res.json(error);
      } else {
        return res.json(results);
      }
    });
  },

  update: (req, res) => {
    const {bug_id:ID} = req.params;
    const DATA = req.body;
    db.query(queryUpdateUser, [DATA, ID], (error, results) => {
      if (error) {
        logger.log('warn', `user.update(): ${error}`);
        res.json(error);
      } else {
        res.json(results);
      }
    });
  },

  delete: (req, res) => {
    const {user_id:ID} = req.params;
    res.json('route not finished');
  },

  setProfilePic: (req, res) => {
    const {user_id:ID} = req.params;
    const {profile_img:IMG} = req.body;
    db.query(queryUpdateProfilePic, [IMG, ID], (error, results) => {
      if (error) {
        logger.log('warn', `users.setProfilePic(): ${error}`);
        res.json(error);
      } else {
        return res.json(results);
      }
    })
  },

  setKonamiUnlock: (req, res) => {
    const {user_id:ID} = req.body;
    db.query(
      `UPDATE users SET konami_unlock = 1 WHERE user_id = ?`
      , [ID], (error, results) => {
        if (error) {
          logger.log('warn', `users.setKonamiUnlock(): ${error}`);
        } else {
          return res.json(results);
        }
      }
    )
  }


};
