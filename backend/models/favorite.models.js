const {database:connect} = require('../../config')['development'];
const logger = require('../_helpers/logger');
const db = require('mysql').createConnection(connect);
const query = require('util').promisify(db.query).bind(db);
const {
  queryGetFavorite,
  queryNewFavorite,
  queryGetAllFavorites,
  queryDeleteFavorite,
} = require('../dbQueries/favorite.queries');

module.exports = {
  getAll,
  isFavorite,
  create,
  deleteById
}

async function getAll(ID) {
  try {
    return await query(queryGetAllFavorites, ID);
  } catch (error) {
    logger.log('warn', `bug.addFavorite(): ${error}`);
    res.json(error);
  }
}

async function isFavorite(bugId, userId) {
  try {
    return await query(queryGetFavorite, [bugId, userId]);
  } catch (error) {
    logger.log('warn', `bug.isFavorite(): ${error}`);
    res.json(error);
  }
}

async function create(data) {
  try {
    return await query(queryNewFavorite, data);
  } catch (error) {
    logger.log('warn', `bug.addFavorite(): ${error}`);
    return error;
  }
}

async function deleteById(bugId, userId) {
  try {
    return await query(queryDeleteFavorite, [bugId, userId]);
  } catch (error) {
    logger.log('warn', `bug.removeFavorite(): ${error}`);
    return error;
  }
}
