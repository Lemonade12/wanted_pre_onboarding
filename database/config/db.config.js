module.exports = {
    HOST: 'localhost',
    USER: 'testuser',
    PASSWORD: 'testuser',
    DB: 'wanted',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  