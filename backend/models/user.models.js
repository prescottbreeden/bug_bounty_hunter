const {database:connect} = require('../../config')['development'];
const logger = require('../_helpers/logger');
const bcrypt = require('bcryptjs');
const db = require('mysql').createConnection(connect);
const query = require('util').promisify(db.query).bind(db);
const {
  queryAllUsers,
  queryUserById,
  queryUserStatsById,
  queryFactionStats,
  queryNewUser,
  queryUpdateUser,
  queryUpdateProfilePic,
  queryKonami
} = require('../dbQueries/user.queries');

module.exports = {
  findAll,
  findById,
  getStats,
  getFactionStats,
  create,
  updateById,
  updateProfilePic,
  updateKonami
}

async function findAll() {
  try {
    return await query(queryAllUsers);
  } catch (error) {
    logger.log('warn', `users.findAll(): ${error}`);
    return error;
  }
}

async function findById(id) {
  try {
    return await query(queryUserById, id);
  } catch (error) {
    logger.log('warn', `users.findById(): ${error}`);
    return error;
  }
}

async function getStats(id) {
  try {
    return await query(queryUserStatsById, id);
  } catch (error) {
    logger.log('warn', `users.getStats(): ${error}`);
    return error;
  }
}

async function getFactionStats(id) {
  try {
    return await query(queryFactionStats, id);
  } catch (error) {
    logger.log('warn', `users.getFactionStats(): ${error}`);
    return error;
  }
}

async function create(data) {
  try {
    data.password = bcrypt.hashSync(data.password, 10);
    return await query(queryNewUser, data);
  } catch (error) {
    logger.log('warn', `users.create(): ${error}`);
    return error;
  }
}

async function updateById(data, id) {
  try {
    return await query(queryUpdateUser, [data, id]);
  } catch (error) {
    logger.log('warn', `user.update(): ${error}`);
    return error;
  }
}

async function updateProfilePic(img, id) {
  try {
    return await query(queryUpdateProfilePic, [img, id]);
  } catch (error) {
    logger.log('warn', `users.setProfilePic(): ${error}`);
    return error;
  }
}

async function updateKonami(id) {
  try {
    await query(queryKonami, id);
    return query(queryUserById, id);
  } catch (error) {
    logger.log('warn', `users.setKonamiUnlock(): ${error}`);
  }
}
