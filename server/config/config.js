require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    host: '127.0.0.1',
    username: 'root',
    password: null,
    database: 'taptrust_development',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    host: '127.0.0.1',
    username: 'root',
    password: null,
    database: 'taptrust_test',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    host: '127.0.0.1',
    username: 'root',
    password: null,
    database: 'taptrust_production',
    dialect: 'postgres',
  },
};
