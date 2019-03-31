const {database:connect} = require('../../config')['development'];
const logger = require('../_helpers/logger');
const db = require('mysql').createConnection(connect);
const query = require('util').promisify(db.query).bind(db);
const {
  queryNewAnswer,
  queryGetAnswer,
  queryUpdateAnswer,
  queryAcceptAnswer,
  queryDeleteAnswer
} = require('../dbQueries/answer.queries');

module.exports = {
  findById,
  create,
  update,
  deleteById,
  accept
}

async function findById(id) {
  try {
    return await query(queryGetAnswer, id);
  } catch (error) {
    logger.log('warn', `answer.getAnswer(): ${error}`);
    return error;
  }
}

async function create(data) {
  try {
    return await query(queryNewAnswer, data);
  } catch (error) {
    logger.log('warn', `answer.create(): ${error}`);
    return error;
  }
}

async function update(id, data) {
  try {
    return await query(queryUpdateAnswer, [data, id]);
  } catch (error) {
    logger.log('warn', `answer.update(): ${error}`);
    return error;
  }
}

async function deleteById(id) {
  try {
    return await query(queryDeleteAnswer, id);
  } catch (error) {
    logger.log('warn', `answer.delete(): ${error}`);
    return error;
  }
}

async function accept(id, data) {
  try {
    return await query(queryAcceptAnswer, [data, id]);
  } catch (error) {
    logger.log('warn', `answer.accept(): ${error}`);
    return error;
  }
}
