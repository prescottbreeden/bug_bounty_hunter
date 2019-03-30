const config = require('../../config')['development'];
const logger = require('../_helpers/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const util = require('util');
const db = mysql.createConnection(config.database);
const query = util.promisify(db.query).bind(db);
const { MapUserData } = require('../models/mapper');
const {
  queryValidateEmail,
  queryLogin,
  queryGetUserById
} = require('./../dbQueries/auth.queries');

module.exports = {
  findEmail,
  login,
  updateToken
}

async function findEmail(email) {
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
    const user = MapUserData(results[0]);
    const status = bcrypt.compareSync(password, results[0]['password']);
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

async function updateToken(id) {
  try {
    const results = query(queryGetUserById, id)
    const user = MapUserData(results[0]);
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
