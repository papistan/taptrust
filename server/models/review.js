'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: DataTypes.STRING,
    score_overall: DataTypes.INTEGER,
    score_transparency: DataTypes.INTEGER,
    score_governance: DataTypes.INTEGER,
    score_legal: DataTypes.INTEGER,
    score_functionality: DataTypes.INTEGER,
}); 

      Reviews.associate = (models) => {
        Reviews.belongsTo(models.Tokens, {
        foreignKey: 'tokenId',
    });
  };

  return Reviews;
};