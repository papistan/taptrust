//'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coins = sequelize.define('Coins', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    symbol: DataTypes.STRING,
    website: DataTypes.STRING,
    founders: DataTypes.STRING,
    score_overall: DataTypes.INTEGER,
    score_transparency: DataTypes.INTEGER,
    score_quality: DataTypes.INTEGER,
    score_friendly: DataTypes.INTEGER,
    score_legal: DataTypes.INTEGER,
    score_usability: DataTypes.INTEGER,
  },
);
   
  Coins.associate = (models) => {
    Coins.hasMany(models.Reviews, {
      foreignKey: 'coinsId',
    });
  };
  
  return Coins;
};