const { database: connect } = require('../../config')['development'];
const logger = require('../_helpers/logger');
const util = require('util');
const db = require('mysql').createConnection(connect);
const query = util.promisify(db.query).bind(db);
const {
  queryAllBugs,
  queryBugById,
  queryNewBug,
  queryUpdateBug,
  queryDeleteBug,
  queryIncrementCounter
} = require('../dbQueries/bug.queries');

module.exports = {
  getAll,
  findById,
  create,
  updateById,
  deleteById
}

async function getAll() {
  try {
    return await query(queryAllBugs);
  } catch (error) {
    logger.log('warn', `bug.getAll(): ${error}`);
    return error;
  }
}

async function findById(id) {
  try {
    await query(queryIncrementCounter, id);
    return await query(queryBugById, id);
  } catch (error) {
    logger.log('warn', `bug.getById(): ${error}`);
    return error;
  }
}

async function create(data) {
  try {
    return await query(queryNewBug, data);
  } catch (error) {
    logger.log('warn', `bug.create(): ${error}`);
    return error;
  }
}

async function updateById(id, data) {
  const { error, traceback, message } = data;
  try {
    return await query(queryUpdateBug, [error, traceback, message, id]);
  } catch (error) {
    logger.log('warn', `bug.update(): ${error}`);
    return error;
  }
}

async function deleteById(id) {
  try {
    return await query(queryDeleteBug, [id, id, id]);
  } catch (error) {
        logger.log('warn', `bug.deleteBug(): ${error}`);
    return error;
  }
}