'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      founders: {
        type: Sequelize.STRING
      },
      score_overall: {
        type: Sequelize.INTEGER
      },
      score_transparency: {
        type: Sequelize.INTEGER
      },
      score_quality: {
        type: Sequelize.INTEGER
      },
      score_friendly: {
        type: Sequelize.INTEGER
      },
      score_legal: {
        type: Sequelize.INTEGER
      },
      score_usability: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tokens');
  }
};