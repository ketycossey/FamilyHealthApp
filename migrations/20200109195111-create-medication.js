'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Medications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medicineName: {
        type: Sequelize.STRING
      },
      medImageUrl: {
        type: Sequelize.STRING
      },
      medDescription: {
        type: Sequelize.STRING
      },
      medFrequency: {
        type: Sequelize.STRING
      },
      member_id:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{ model: 'Family_members', field:'id'}
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
    return queryInterface.dropTable('Medications');
  }
};