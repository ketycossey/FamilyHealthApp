'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TestLabs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageURL: {
        type: Sequelize.STRING
      },
      test_date: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      memberId: {
        type:Sequelize.INTEGER,
        references: {model:'Family_members', field: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TestLabs');
  }
};