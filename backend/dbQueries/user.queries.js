const env = process.env.NODE_ENV || 'development';
const logger = require('../_helpers/logger');
const { User } = require('../models/Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db_connection = mysql.createConnection(config.database);