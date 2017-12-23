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
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      age: {
        allowNull: false,
        type: Sequelize.STRING
      },
      symbol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      website: {
        allowNull: false,
        type: Sequelize.STRING
      },
      founders: {
        allowNull: false,
        type: Sequelize.STRING
      },
      score_overall: {
        type: Sequelize.INTEGER
      },
      score_transparency: {
        type: Sequelize.INTEGER
      },
      score_governance: {
        type: Sequelize.INTEGER
      },
      score_legal: {
        type: Sequelize.INTEGER
      },
      score_functionality: {
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