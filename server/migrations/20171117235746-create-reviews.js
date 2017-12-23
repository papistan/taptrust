'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Reviews', {
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
      review: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      score_overall: {
        type: Sequelize.INTEGER
      },
      score_transparency: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      score_governance: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      score_legal: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      score_functionality: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tokenId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tokens',
          key: 'id',
        },
      },
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Reviews'),
};