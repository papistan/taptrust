//'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define('Tokens', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    age: DataTypes.STRING,
    symbol: DataTypes.STRING,
    website: DataTypes.STRING,
    founders: DataTypes.STRING,
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