const {database:connect} = require('../../config')['development'];
const logger = require('../_helpers/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('mysql').createConnection(connect);
const query = require('util').promisify(db.query).bind(db);
const {
  queryValidateEmail,
  queryLogin,
  queryGetUserById
} = require('../dbQueries/auth.queries');

module.exports = {
  findByEmail,
  updateTokenById,
  login
}

async function findByEmail(email) {
  try {
    return await query(queryValidateEmail, email);
  } catch (error) {
    logger.log('warn', `auth.getEmail(): ${error}`);
    return error;
  }
}

async function login(email, password) {
  try {
    const results = await query(queryLogin, email);
    const user = results[0];
    const status = bcrypt.compareSync(password, user.password);
    if (status) {
      return createNewToken(user);
    } else {
      return null;
    }
  } catch (error) {
    logger.log('warn', `auth.login(): ${error}`);
    return error;
  }
}

async function updateTokenById(id) {
  try {
    const results = await query(queryGetUserById, id)
    const user = results[0];
    return createNewToken(user);
  } catch (error) {
    logger.log('warn', `auth.updateToken(): ${error}`);
    return error
  }
}

const createNewToken = user => {
  console.log('returning user: \n\n', user, '\n\n');
  return jwt.sign({ currentUser: user }, 'rubber baby buggy bumpers');
}
