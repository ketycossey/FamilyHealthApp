'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Insurances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      front_pic: {
        type: Sequelize.STRING
      },
      back_pic: {
        type: Sequelize.STRING
      },
      care_provider_name: {
        type: Sequelize.STRING
      },
      member_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Family_members', field:'id'}
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
    return queryInterface.dropTable('Insurances');
  }
};