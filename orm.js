const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(
  'wanted',
  'testuser',
  'testuser',
  {
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres',
    directory: './database/models',
    //noAlias: true // as 별칭 미설정 여부
  }
);
auto.run(err => {
  if (err) throw err;
});