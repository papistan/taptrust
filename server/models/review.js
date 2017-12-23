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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score_overall: DataTypes.INTEGER,
    score_transparency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score_governance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score_legal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score_functionality: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
}); 

      Reviews.associate = (models) => {
        Reviews.belongsTo(models.Tokens, {
        foreignKey: 'tokenId',
    });
  };

  return Reviews;
};