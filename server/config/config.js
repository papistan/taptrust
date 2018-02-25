require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DB_URL,
    host: '127.0.0.1',
    username: 'root',
    password: null,
    database: 'taptrust_development',
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DB_URL,
    host: '127.0.0.1',
    username: 'root',
    password: null,
    database: 'taptrust_test',
    dialect: 'postgres',
  },
  production: {
    url: process.env.PROD_DB_URL,
    host: '127.0.0.1',
    username: 'root',
    password: null,
    database: 'taptrust_production',
    dialect: 'postgres',
  },
};
