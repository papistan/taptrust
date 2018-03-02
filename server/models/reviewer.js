'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reviewer = sequelize.define('Reviewer', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.TEXT,
    last_login: DataTypes.DATE,
    status: DataTypes.ENUM
  }, {});
  Reviewer.associate = function(models) {
    // associations can be defined here
  };
  return Reviewer;
};