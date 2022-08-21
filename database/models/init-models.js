var DataTypes = require("sequelize").DataTypes;
var _apply_log = require("./apply_log");
var _company = require("./company");
var _job_opening = require("./job_opening");
var _users = require("./users");

function initModels(sequelize) {
  var apply_log = _apply_log(sequelize, DataTypes);
  var company = _company(sequelize, DataTypes);
  var job_opening = _job_opening(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  job_opening.belongsTo(company, { as: "company", foreignKey: "company_id"});
  company.hasMany(job_opening, { as: "job_openings", foreignKey: "company_id"});
  apply_log.belongsTo(job_opening, { as: "opening", foreignKey: "opening_id"});
  job_opening.hasMany(apply_log, { as: "apply_logs", foreignKey: "opening_id"});
  apply_log.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(apply_log, { as: "apply_logs", foreignKey: "user_id"});

  return {
    apply_log,
    company,
    job_opening,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
