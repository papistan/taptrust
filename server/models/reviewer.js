'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reviewer = sequelize.define('Reviewer', {
    email: { 
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  }, {});
  Reviewer.associate = function(models) {
    // associations can be defined here
  };
  return Reviewer;
};