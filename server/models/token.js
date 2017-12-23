//'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define('Tokens', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    founders: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score_overall: DataTypes.INTEGER,
    score_transparency: DataTypes.INTEGER,
    score_governance: DataTypes.INTEGER,
    score_legal: DataTypes.INTEGER,
    score_functionality: DataTypes.INTEGER,
  });
   
  Tokens.associate = (models) => {
    Tokens.hasMany(models.Reviews, {
      foreignKey: 'tokenId',
    });
  };
  
  return Tokens;
};