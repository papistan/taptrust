'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reviewer = sequelize.define('Reviewer', {
    email: DataTypes.STRING
  }, {});
  Reviewer.associate = function(models) {
    // associations can be defined here
  };
  return Reviewer;
};