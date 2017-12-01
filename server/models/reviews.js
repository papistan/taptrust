'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score_overall: DataTypes.INTEGER,
    score_transparency: DataTypes.INTEGER,
    score_quality: DataTypes.INTEGER,
    score_friendly: DataTypes.INTEGER,
    score_legal: DataTypes.INTEGER,
    score_usability: DataTypes.INTEGER,
}); 

      Reviews.associate = (models) => {
        Reviews.belongsTo(models.Coins, {
        foreignKey: 'coinsId',
    });
  };

  return Reviews;
};