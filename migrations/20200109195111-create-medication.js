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
      memberId:{
        allowNull:false,
        type:Sequelize.STRING,
        references:{ model: 'family_Member', field:'id'}
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